import { useState } from 'react'
import SushiConveyorMenu, { type ConveyorDish } from '@/components/ui/sushi-conveyor-menu'
import '../conveyor.css'

const dishes: ConveyorDish[] = [
  { id: 'salmon-nigiri', name: 'Нигири с лососем', description: 'Лосось на рисе с маринованным имбирём.', details: ['2 штуки', 'Рыба'], tier: 2, price: '$4.20', image: '/dishes/salmon-nigiri.webp' },
  { id: 'tuna-nigiri', name: 'Нигири с тунцом', description: 'Ломтики тунца на тёплом рисе.', details: ['2 штуки', 'Рыба'], tier: 4, price: '$6.80', image: '/dishes/tuna-nigiri.webp' },
  { id: 'ebi-nigiri', name: 'Нигири с креветкой', description: 'Варёная креветка на порции риса.', details: ['2 штуки', 'Ракообразные'], tier: 2, price: '$4.20', image: '/dishes/ebi-nigiri.webp' },
  { id: 'california-roll', name: 'Калифорния', description: 'Ролл с крабом, авокадо и огурцом в икре тобико.', details: ['4 штуки', 'Ракообразные', 'Икра'], tier: 3, price: '$5.40', image: '/dishes/california-roll.webp' },
  { id: 'dragon-roll', name: 'Дракон', description: 'Ролл с креветкой в темпуре, авокадо и соусом унаги.', details: ['4 штуки', 'Ракообразные', 'Пшеница'], tier: 5, price: '$8.50', image: '/dishes/dragon-roll.webp' },
  { id: 'tamago', name: 'Нигири с омлетом', description: 'Сладковатый омлет на рисе с полоской нори.', details: ['2 штуки', 'Яйцо'], tier: 1, price: '$3.20', image: '/dishes/tamago.webp' },
  { id: 'edamame', name: 'Эдамаме', description: 'Соевые бобы на пару с морской солью.', details: ['1 миска', 'Соя'], tier: 1, price: '$3.20', image: '/dishes/edamame.webp' },
  { id: 'mochi', name: 'Моти с мороженым', description: 'Два моти с мороженым — с клубникой и с чаем матча.', details: ['2 штуки', 'Молоко'], tier: 3, price: '$5.40', image: '/dishes/mochi.webp' },
]

export function DinnerBelt() {
  const [selected, setSelected] = useState<ConveyorDish>()
  return <div className="dinner-belt">
    <SushiConveyorMenu
      aria-label="Лента блюд"
      items={dishes}
      caption="Прокрути ленту или нажми на тарелку, чтобы посмотреть блюдо."
      labels={{ add: 'Выбрать на ужин', close: 'Закрыть', previous: 'Предыдущее блюдо', next: 'Следующее блюдо', pause: 'Пауза ленты' }}
      onAdd={setSelected}
    />
    <div role="status">{selected && <p className="dinner-choice">На ужин — {selected.name.toLocaleLowerCase('ru')}.</p>}</div>
  </div>
}
