# Csefu Klíma

Statikus, reszponzív magyar weboldal, külső build vagy szerver nélkül.

Publikus oldal: https://realabu.github.io/csefuklima.hu/

## Tartalom

- Főoldal: szolgáltatások, C&H választások, gondos kivitelezés, kapcsolat.
- `keszulekek/`: kereshető és szűrhető katalógus, 165 külön készülékváltozat saját statikus adatlapjával.
- `gondos-klimaszereles/`: telepítési szemlélet és ajánlat-összehasonlítási segítség.
- `klima-futesre/`: téli választási szempontok.
- `klimatisztitas/`: karbantartás és a meglévő Google Forms időpontfoglaló.
- `data/catalog.json`: 2026-10-09-én ellenőrzött gyártói adatok, források és helyi termékfotók.

A katalógus a magyar C&H oldal lakossági, ipari és hőszivattyús kínálatát foglalja össze. A külön színek és teljesítmények külön oldalt kaptak. Arctic Plus esetén a gyártói oldal közös családoldalt és teljesítményválasztót közöl; az ott megadott négy teljesítménynek külön oldal készült, kitalált típuskód nélkül.

## Karbantartás

A katalógus JSON módosítása után futtassa:

```sh
python tools/build_catalog.py
```

A script csak a helyi adatokat használja, függőség és hálózati kérés nélkül. Újrafogalmazza a termékoldalakat, katalógust, három landingoldalt, sitemapet és a főoldali kiemeléseket. Típus törlésekor a már nem szükséges HTML-fájlt is törölni kell. A főoldal többi szövege közvetlenül az `index.html` fájlban módosítható. A közös megjelenés és viselkedés a `style.css` és `script.js` fájlban található.

## Kapcsolatfelvétel

- Messenger: `https://m.me/csefuklima`, a vállalkozás oldalának postaládája, nem ellenőrizetlen személyes profil.
- Telefon: +36 30 884 2875, az új hivatalos Csefu-oldal alapján. Asztali böngészőben másolás; mobiltelefonon hívásindítás.
- E-mail: csefuklima@gmail.com.
- Az érdeklődési mezők az üzenetet a vágólapra készítik elő. Küldés csak a látogató saját alkalmazásában történik; az oldal nem tárolja az adatokat.
- SMS csak mobiltelefonon jelenik meg, a helyes új számra címezve.
- A Google Forms klímatisztítás-időpontfoglaló, nem általános ajánlatkérő. Beágyazása csak külön kattintásra töltődik be.
- Az oldalon nincs Meta Pixel, Google Analytics vagy reklámkövetés.

## Publikálás

GitHub Pages: `main` ág, repository gyökérmappa. A `.nojekyll` fájl megmarad. A hirdetési céloldalak a fenti útvonalakon közvetlenül használhatók. A `sitemap.xml` Pages-címeit egy saját domain bevezetésekor frissíteni kell.

A nyitókép illusztráció; a termékfotók a gyártói katalógusból származnak. Valós munkaképekhez továbbra is a Csefu Facebook-oldala kapcsolódik. Nem szerepel kitalált értékelés, megtakarítás, készletinformáció vagy hatósági minősítés.
