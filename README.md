# Renan Gonçalves — Site

Primeira versão do site institucional/comercial para um profissional de tráfego pago e gestão de Instagram.

## Arquivos
- `index.html`
- `styles.css`
- `script.js`

## Como abrir
Abra o arquivo `index.html` no navegador.

## O que já funciona
- Layout responsivo.
- Menu mobile.
- Animações de entrada.
- Hero com visual analítico.
- Seções de Instagram e tráfego pago.
- Dashboard ilustrativo.
- Método RG com progresso no scroll.
- Cases em modal.
- Raio-X Digital interativo.
- CTA para WhatsApp.
- Ajustes para redução de movimento.

## O que precisa ser configurado
### WhatsApp
Abra `script.js` e altere:

```js
const RENAN_WHATSAPP = "";
```

Exemplo:
```js
const RENAN_WHATSAPP = "5511999999999";
```

Use somente números.

### Foto do Renan
No `index.html`, existem dois placeholders:
- Hero (`.portrait-placeholder`)
- Sobre (`.about-photo-placeholder`)

Quando houver foto, podemos trocar os placeholders por `<img>`.

### Instagram / LinkedIn
Os links ainda estão como `href="#"`.

### Cases e depoimentos
Os dados exibidos são placeholders e não representam resultados reais.

## Próximos passos sugeridos
1. Inserir foto real do Renan.
2. Configurar WhatsApp.
3. Inserir Instagram/LinkedIn.
4. Substituir cases por resultados reais.
5. Inserir depoimentos reais.
6. Publicar em Firebase Hosting, Vercel ou GitHub Pages.
