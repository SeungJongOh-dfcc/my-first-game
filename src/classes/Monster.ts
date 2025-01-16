import GameObject from './GameObject'

export enum MonsterAppearance {
  Default = 'default',
  Monster2 = 'monster2',
}

export default class Monster extends GameObject {
  public appearance: MonsterAppearance
  public experience: number // 경험치 속성

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    appearance: MonsterAppearance = MonsterAppearance.Default // 기본값 설정
  ) {
    super(x, y, width, height) // 부모 클래스 생성자 호출
    this.appearance = appearance

    // appearance에 따라 기본 경험치 설정
    switch (appearance) {
      case MonsterAppearance.Monster2:
        this.experience = 30
        break
      default:
        this.experience = 10
    }
  }

  public move(speed: number) {
    this.x += speed
  }

  draw(
    ctx: CanvasRenderingContext2D,
    scrollOffset: number,
    monsterImage: HTMLImageElement
  ) {
    ctx.drawImage(
      monsterImage,
      this.x - scrollOffset,
      this.y,
      this.width,
      this.height
    )
  }
}
