# Áudio dos easter eggs

## Hino (easter egg da bandeira tricolor)

Por padrão, a brincadeira da bandeira toca uma **fanfarra sintetizada** (gerada
em código, sem nenhum arquivo e sem direitos autorais).

Hinos de clubes são **obras protegidas por direitos autorais**. Para tocar uma
versão sua sem riscos, use uma **versão instrumental, regravação independente ou
cover** (por exemplo, uma versão de guitarra) que você tenha o direito de usar,
e dê os devidos créditos ao autor.

### Como adicionar o seu áudio
Coloque o arquivo aqui com este nome exato:

```
site/public/audio/spfc-anthem.mp3
```

Quando esse arquivo existir, ele toca automaticamente no lugar da fanfarra. Se
não existir, cai na fanfarra — então o site funciona dos dois jeitos.

### Créditos na tela
Para mostrar o crédito do cover enquanto o áudio toca, preencha o campo
`anthemCredit` em `site/src/data/content.js`. Exemplo:

```js
anthemCredit: 'Hino do SPFC — cover de guitarra por <autor> (<link>)',
```

Deixe `''` para não mostrar nada.

---

O drone sinistro da seção Ominiosos é 100% sintetizado e não precisa de arquivo.
