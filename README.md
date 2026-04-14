# Ty a Tvé – Meditace & Pohádky

Webová stránka s meditačními nahrávkami pro dospělé a pohádkami na dobrou noc pro děti 2–4 roky.

## Struktura projektu

```
ty-a-tve/
├── index.html
├── README.md
└── audio/
    ├── meditace/
    │   ├── dychani/
    │   │   ├── ranni-probuzeni.mp3
    │   │   ├── box-breathing.mp3
    │   │   └── vecerni-uvolneni.mp3
    │   ├── body-scan/
    │   │   ├── rychly-scan.mp3
    │   │   ├── hluboke-uvolneni.mp3
    │   │   └── joga-nidra.mp3
    │   ├── vizualizace/
    │   │   ├── prochazka-lesem.mp3
    │   │   ├── u-more.mp3
    │   │   └── horsky-pramen.mp3
    │   ├── vdecnost/
    │   │   ├── tri-dobre-veci.mp3
    │   │   ├── laskavost-k-sobe.mp3
    │   │   └── propojeni.mp3
    │   └── usinani/
    │       ├── pocitani-hvezd.mp3
    │       ├── tezke-telo.mp3
    │       └── nocni-dest.mp3
    └── pohadky/
        ├── 2roky/
        │   ├── o-repe.mp3
        │   ├── o-kohoutkovi-a-slepicce.mp3
        │   ├── o-kocicce-a-pejskovi.mp3
        │   └── jak-slo-vajicko-na-vandr.mp3
        ├── 3roky/
        │   ├── o-trech-medvedech.mp3
        │   ├── o-zlate-rybce.mp3
        │   ├── palecka.mp3
        │   ├── o-pernikove-chaloupce.mp3
        │   └── o-velike-repe.mp3
        └── 4roky/
            ├── jak-sel-honzik-do-sveta.mp3
            ├── zviratka-a-loupeznici.mp3
            ├── o-smolickovi.mp3
            ├── budulink.mp3
            ├── o-neposlusnych-kuzlatkach.mp3
            └── o-cervene-karkulce.mp3
```

## Jak přidat nahrávky

Nahraďte soubory `.gitkeep` v jednotlivých složkách svými MP3 soubory.
Názvy souborů musí přesně odpovídat názvům uvedeným výše.

## Nasazení na GitHub Pages

```bash
git init
git add .
git commit -m "Ty a Tvé – první verze"
git branch -M main
git remote add origin https://github.com/VAS-USERNAME/ty-a-tve.git
git push -u origin main
```

Pak: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**

Web bude za 1–2 minuty na `https://vas-username.github.io/ty-a-tve/`

## Limity

- GitHub Pages: max 100 MB/soubor, 1 GB/repozitář
- Tlačítko „Zakoupit" je zatím vizuální – pro platby napojte Stripe nebo Comgate
