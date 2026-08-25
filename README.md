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
O número do Renan já foi configurado no `script.js`:

```js
const RENAN_WHATSAPP = "5511976260404";
```

### Foto do Renan
A foto já foi aplicada no Hero e na seção Sobre usando o arquivo:

`assets/renan-goncalves.png`

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

## Atualização V3 — Responsividade global
A folha de estilos agora inclui ajustes específicos para:
- PC e monitores grandes (1600px+)
- notebooks e desktops compactos (1100–1280px)
- tablets em retrato e paisagem (700–900px)
- celulares (380–520px)
- celulares pequenos (320–380px)
- telas de pouca altura e orientação landscape

Também foram corrigidos estouros horizontais, escala de tipografia, grids, Hero, cards, dashboard, Método RG, cases, Raio-X, modais e rodapé.
