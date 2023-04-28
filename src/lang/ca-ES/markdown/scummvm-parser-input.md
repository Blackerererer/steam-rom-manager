# Unique inputs for ScummVM Parser

## ScummVM Binary Path
By default Steam ROM Manager assumes your ScummVM is located at `C:\Program Files\ScummVM\ScummVM.exe` on Windows, or `/usr/bin/scummvm` on Linux with ScummVM that is not in a Flatpak. This field allows you to override that path if your ScummVM installation is elsewhere. NOTE: If this is a Flatpak distribution of SRM. You may not be able to find the binary with the Browse button, unless you adjust SRM Flatpak permissions. However, the binary is never executed from SRM, hence typing in the actual path works as well.

## ScummVM Ini Path
By default Steam ROM Manager assumes `%APPDATA%\..\Roaming\ScummVM\scummvm.ini` on Windows and `~/.config/scummvm/scummvm.ini` on Linux without Flatpak. Flatpak option forces Flatpak locations.

## Use Flatpak Command-Line
If you are using Linux and Flatpak distribution of ScummVM, then activate this. Otherwise leave it deactivated. This changes the default for ScummVM Binary Path and Ini Path to Flatpak defaults. Activate only on Linux.