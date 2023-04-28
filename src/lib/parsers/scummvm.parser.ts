import { ParserInfo, GenericParser, ParsedData } from '../../models';
import { APP } from '../../variables';
import * as _ from "lodash";
import * as fs from "fs-extra";
import * as file from "../../lib/helpers/file";

export class ScummVMParser implements GenericParser {

  private get lang() {
    return APP.lang.scummvmParser;
  }
  getParserInfo(): ParserInfo {
    return {
      title: 'ScummVM', 
      info: this.lang.docs__md.self.join(''),
      inputs: {
        'scummvmBinary': {
          label: this.lang.scummvmBinaryTitle,
          inputType: 'path',
          validationFn:  (input: string) => {
            if(!input || file.validatePath(input, false)) {
              return null;
            } else {
              const isSRMFlatpak = process.env['IN_FLATPAK'] == "1";
              return (isSRMFlatpak && input) ? null : this.lang.errors.invalidScummvmBinary;
            }
          },
          info: this.lang.docs__md.input.join('')
        },
        'scummvmIni': {
          label: this.lang.scummvmIniTitle,
          inputType: 'path',
          validationFn:  (input: string) => {
            if(!input || file.validatePath(input, false)) {
              return null;
            } else {
              return this.lang.errors.invalidScummvmIni;
            }
          },
          info: this.lang.docs__md.input.join('')
        },        
        'useFlatpak': {
          label: this.lang.useFlatpakTitle,
          inputType: 'toggle',
          validationFn: (input: boolean) => {
              return process.platform != "win32" || !input ? null : this.lang.errors.flatpakUnavailableOnWindows;
          },
          info: this.lang.docs__md.input.join('')
        }
      }
    };
  }

  execute(directories: string[], inputs: { [key: string]: any }, cache?: { [key: string]: any }) {
    return new Promise<ParsedData>((resolve,reject)=>
    {
      const util = require('util');
      const path = require('path');
      const ini = require('ini');
      const useFlatpak = inputs.useFlatpak;
      const isSRMFlatpak = process.env['IN_FLATPAK'] == "1";
      const flatpakScummVMPrefix = useFlatpak ? "run org.scummvm.ScummVM " : "";
      const scummVMFlatpakConfigPathPrefix = isSRMFlatpak ? `${process.env['XDG_CONFIG_HOME']}/../../` : 
        "~/.var/app/";
      const isWindows = process.platform == "win32";

      const defaultScummvmBinaryPath = isWindows ?
        "C:\\Program Files\\ScummVM\\ScummVM.exe" :
        "/usr/bin/scummvm";
      const defaultScummvmIniPath = path.normalize(
        isWindows ?
        `${process.env['APPDATA']}\\..\\Roaming\\ScummVM\\scummvm.ini` :
        (useFlatpak ? `${scummVMFlatpakConfigPathPrefix}/org.scummvm.ScummVM/config/scummvm/scummvm.ini` : '~/.config/scummvm/scummvm.ini')
        );

      
      const scummvmBinary = useFlatpak ?
        "/usr/bin/flatpak" :
        (path.normalize(inputs.scummvmBinary || defaultScummvmBinaryPath));
      const scummvmIni = useFlatpak ? defaultScummvmIniPath : (inputs.scummvmIni || defaultScummvmIniPath);
      const flatpakSpawnPrefix = isSRMFlatpak ? "flatpak-spawn --host --watch-bus " : "";

      const execAsync = util.promisify(require('child_process').exec);
      // on Windows just do the read
      const readFileAsync = util.promisify(fs.readFile);
      let readProxy = isWindows ? readFileAsync(scummvmIni, 'ascii').then((output : any) => { return { stdout : output }; }) :
        execAsync(`${flatpakSpawnPrefix}cat ${scummvmIni}; exit`)
      readProxy.then( (output : any) =>
      {
        var config = ini.parse(output.stdout);

        let parsedData: ParsedData = {success: [], failed:[]};
        parsedData.executableLocation = scummvmBinary;
        Object.keys(config).forEach(
          key => {
            if (key == 'scummvm')
            {
              return;
            }

            const gameRecord = config[key];

            if (( (typeof gameRecord.gameid) != 'string') || ( (typeof gameRecord.description) != 'string'))
            {
              return;
            }

            parsedData.success.push({extractedTitle: gameRecord.description, filePath: scummvmBinary, launchOptions: `${flatpakScummVMPrefix}${gameRecord.gameid}`});
          }
        );
        resolve(parsedData);
      }).catch((err : any)=>{
        reject(this.lang.errors.fatalError__i.interpolate({error: err}));
      });
    });
  }
}
