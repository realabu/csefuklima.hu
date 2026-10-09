# Csefu Klíma

Statikus, reszponzív magyar bemutatkozó és készülékérdeklődési weboldal.

## Felépítés

- `index.html`: véglegesnek javasolt magyar webszöveg, szolgáltatások, készülékek, bemutatkozás, gyakori kérdések, kapcsolat.
- `style.css`: mobilra, tabletre és asztali képernyőre optimalizált arculat.
- `script.js`: mobilmenü, készülékszűrés, készülékválasztás, SMS-előkészítés és Messengerhez másolható érdeklődés.
- `assets/otthon.webp`: AI-val készített illusztratív hangulatkép, nem kivitelezési referencia.
- `docs/piaci-attekintes.md`: források, piaci tanulságok és az ellenőrzés határai.

Nincs csomagtelepítés vagy build. Helyi megtekintés: `python -m http.server 8080`.

## Közzététel

GitHub Pages: `main` ág, `/ (root)` könyvtár. A `.nojekyll` fájl közvetlen statikus kiszolgálást tesz lehetővé. A saját domainhez nincs CNAME megadva; a csefuklima.hu DNS-beállításait ez a kiadás nem változtatja.

## Kapcsolatfelvétel

Az oldal nem küld szerveroldali űrlapot. A látogató saját SMS-alkalmazásában küldi el az előkészített üzenetet, vagy kimásolja és a Facebook-oldalnak küldi. Az oldal nem tárolja a mezők tartalmát. Nincs analitika, reklámsüti, külső font vagy beágyazott Facebook-követés.

A termékek korábbi nyilvános Csefu-munkákban szereplő családok. Nincs készlet-, ár- vagy konkrét jótállási ígéret; az aktuális modell és az értékesítés feltételei egyeztetendők. A kW-adatok a korábbi posztokból származnak.

## Frissítés

A telefonszám az `index.html` és `script.js` fájlokban szerepel. Készülékcsaládot, teljesítményt és leírást az `index.html` készülékkártyáiban lehet módosítani. A `data-power` értéke a szűrőt vezérli, a `data-product` az érdeklődési szöveget.

Minden további termékadatot a konkrét, aktuális gyártói adatlap alapján kell feltölteni. Nyilvántartási adatok, szerelői minősítések, referenciafotók és tulajdonosi portré csak igazolt adatból kerüljön az oldalra.
