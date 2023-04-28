# Jedinečné vstupy pro parser ScummVM

## Cesta k ScummVM spouštěcímu souboru
Steam ROM Manager předpokládá, že cesta k vašemu ScummVM je `C:\Program Files\ScummVM\ScummVM.exe` na Windows a `/usr/bin/scummvm` na Linuxu, pokud nejde o Flatpak balíček. Toto pole umožňuje přepsat tuto cestu na cestu odpovídající vaší instalaci. Pozn.: Pokud je SRM samotný ve Flatpak balíčku, nemusíte být schopni najít Flatpak při použití dialogového okna, pokud SRM nemá práva k cílové cestě. SRM nepotřebuje přístup k tomuto souboru, jenom jeho cestu, tudíž pokud ho SRM nenajde, parser přijme i tuto cestu a bude fungovat.

## Cesta k ini souboru ScummVM
Steam ROM Manager předpokládá, že cesta je `%APPDATA%\..\Roaming\ScummVM\scummvm.ini` na Windows a `~/.config/scummvm/scummvm.ini` na Linuxu mimo Flatpak baliček. Flatpak mód parseru hledá v úložišti konfigurací Flatpaku pro ScummVM.

## Použít Flatpak balíček ScummVM
Pokud používáte Linux a Flatpak balíček ScummVM, pak aktivujte tuto možnost. Jinak ji nechte deaktivovanou. Tato možnost nastaví automaticky cestu ke ScummVM a jeho ini souboru podle cest, které používá. Aktivujte jen na Linuxu.