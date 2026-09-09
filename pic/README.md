# Изображения

Экспортированы через Figma MCP из файла `ZGvSZcFNYGG8ePhMb3iuk0`.

| Файл | Узел | Назначение |
| --- | --- | --- |
| avatar.png | 2074:10211 | Аватар, 48 × 48 CSS px |
| telegram.svg | 2074:10438 | Telegram, 20 × 20 CSS px |
| email.svg | 2074:10449 | Почта, 24 × 24 px на десктопе, 20 × 20 px на мобильном |
| research.svg | 2074:10231 | UX-исследования |
| wireframes.svg | 2074:10243 | User flows & wireframes |
| design.svg | 2074:10254 | UI-дизайн |
| ai.svg | 2074:10266 | AI |
| transport.png | 2074:10293 | Композиция превью транспортного приложения |
| corporate.png | 2074:10345 | Прежнее превью, больше не используется в карточке главной |
| corporate-desktop.png | 2484:6293 | Единое превью корпоративного транспорта на десктопе и мобильном |
| soul.png | 2074:10358 | Превью Soul |
| cashier.png | 2074:10372 | Превью АРМ кассира |
| menu.png | 2346:4593 | Кнопка меню, 44 × 44 CSS px |

Иконки направлений работы имеют размер 32 × 32 px на десктопе и 24 × 24 px на мобильном. Превью проектов экспортированы как готовые композиции 560 × 356 px и масштабируются пропорционально. Статический фон первого превью уже входит в экспорт Figma.

## Кейс корпоративного транспорта

`modal-close.svg` — иконка закрытия окна связи, узел Figma `1720:29379`.
Окно использует существующие `telegram.svg` и `email.svg`.

Актуальные превью карусели из `2485:6295`: `carousel-corporate-v2.png`
(слой `2486:6430`), `carousel-soul-v2.png` (`2486:6449`),
`carousel-transport-v2.png` (`2486:6439`), `carousel-cashier-v2.png`
(`2486:6461`). Это исходные изображения из `get_design_context`;
на десктопе отображаются в области 305 × 252 px.

Экраны — готовые изображения из Figma, включающие рамку телефона. Для четырёх секций ниже на ширинах свыше 700 px используются отдельные экспорты десктопных узлов через `picture`; мобильные изображения сохранены. Обложка экспортирована как целая композиция. Текст страницы остаётся HTML.

| Десктопный файл | Узел | Размер в вёрстке при ширине 1440 px |
| --- | --- | --- |
| corporate-case/preorder-desktop.png | 2053:9375 | 295 × 600 px |
| corporate-case/scenario-preorder-desktop.png | 2037:9357 | 295 × 600 px |
| corporate-case/scenario-assigned-desktop.png | 2037:9366 | 295 × 600 px |
| corporate-case/map-desktop.png | 2055:9384 | 295 × 600 px |
| corporate-case/qr-desktop.png | 2056:9393 | ≈309 × 630 px |

| Файл | Узел | Размер в вёрстке |
| --- | --- | --- |
| corporate-case/hero.png | 2056:9424 | До 1248 × 630 px, пропорционально ширине |
| corporate-case/preorder.png | 2347:4712 | До 295 × 600 px |
| corporate-case/scenario-preorder.png | 2347:4772 | До 295 × 600 px; мобильный — до 266 × 541 px |
| corporate-case/scenario-assigned.png | 2347:4778 | До 295 × 600 px; мобильный — до 266 × 541 px |
| corporate-case/map.png | 2347:4793 | До 295 × 600 px |
| corporate-case/qr.png | 2354:6790 | До 261 × 532 px |
| corporate-case/rescheduled.png | 2347:4928 | До 295 × 600 px |
| corporate-case/cancelled.png | 2347:4930 | До 295 × 600 px |

`carousel-transport.png`, `carousel-soul.png`, `carousel-cashier.png` получены из контекста `2485:6295`; превью используют кадрирование макета в области 304 × 252 px на десктопе и адаптивной области высотой 214 px на мобильном. `chevron-left.svg` и `chevron-right.svg` — узлы `2485:6300` и `2485:6303`, 20 × 20 px внутри кнопок 48 × 48 px (десктоп) / 40 × 40 px (мобильный).
