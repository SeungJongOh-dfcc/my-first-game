import FinishLine from '@/classes/FinishLine'
import Coin from '../classes/Coin'
import Meat from '../classes/Meat'
import Monster from '../classes/Monster'
import Platform from '../classes/Platform'
import Wing from '../classes/Wing'
import {
  monsterAppearances,
  playerAppearances,
  platformAppearances,
  meatAppearances,
  wingAppearances,
  finishLineAppearances,
} from '../constants/appearance'
import { coinAppearances } from '../constants/appearance'
import { Player } from '../constants/objects'

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  flip: boolean = true
) => {
  const image = playerAppearances[player.appearance]

  // 이미지가 로드되지 않았으면 건너뜀
  if (!image || !image.complete) {
    console.warn(
      `Image for appearance '${player.appearance}' is not loaded yet.`
    )
    return
  }

  // 무적 상태 처리
  if (player.isInvincible) {
    ctx.globalAlpha = 0.5 // 깜빡이는 효과 (반투명)
  } else {
    ctx.globalAlpha = 1 // 원래 상태
  }

  if (flip) {
    // 캔버스 상태 저장
    ctx.save()

    // 캔버스 원점 이동 및 반전
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2)
    ctx.scale(-1, 1)

    // 이미지의 반전된 위치에 그리기
    ctx.drawImage(
      image,
      -player.width / 2, // 반전된 기준에서 x, y 조정
      -player.height / 2,
      player.width,
      player.height
    )

    // 캔버스 상태 복원
    ctx.restore()
  } else {
    // 일반적인 이미지 그리기
    ctx.drawImage(image, player.x, player.y, player.width, player.height)
  }

  ctx.globalAlpha = 1 // 투명도 초기화
}

export const drawPlatforms = (
  ctx: CanvasRenderingContext2D,
  platforms: Platform[],
  scrollOffset: number
) => {
  platforms.forEach((platform) => {
    // appearance에 맞는 이미지를 가져옴
    const platformImage = platformAppearances[platform.appearance || 'default']

    // 이미지가 로드되지 않았으면 경고 출력 후 건너뜀
    if (!platformImage || !platformImage.complete) {
      console.warn(
        `Image for appearance '${platform.appearance}' is not loaded yet.`
      )
      return
    }

    platform.draw(ctx, scrollOffset, platformImage)
  })
}

export const drawFinishLine = (
  ctx: CanvasRenderingContext2D,
  finishLine: FinishLine,
  scrollOffset: number
) => {
  // appearance에 맞는 이미지를 가져옴
  const finishLineImage =
    finishLineAppearances[finishLine.appearance || 'default']

  // 이미지가 로드되지 않았으면 경고 출력 후 건너뜀
  if (!finishLineImage || !finishLineImage.complete) {
    console.warn(
      `Image for appearance '${finishLine.appearance}' is not loaded yet.`
    )
    return
  }

  finishLine.draw(ctx, scrollOffset, finishLineImage)
}

export const drawCoins = (
  ctx: CanvasRenderingContext2D,
  coins: Coin[],
  scrollOffset: number
) => {
  const image = coinAppearances.default

  // 이미지가 로드되지 않았으면 건너뜀
  if (!image || !image.complete) {
    console.warn(
      `Image for appearance '${coinAppearances.default}' is not loaded yet.`
    )
    return
  }

  coins.forEach((coin) => {
    coin.draw(ctx, scrollOffset, image)
  })
}

export const drawMonsters = (
  ctx: CanvasRenderingContext2D,
  monsters: Monster[],
  scrollOffset: number
) => {
  monsters.forEach((monster) => {
    // appearance에 맞는 이미지를 가져옴
    const monsterImage = monsterAppearances[monster.appearance || 'default']

    // 이미지가 로드되지 않았으면 경고 출력 후 건너뜀
    if (!monsterImage || !monsterImage.complete) {
      console.warn(
        `Image for appearance '${monster.appearance}' is not loaded yet.`
      )
      return
    }

    // 몬스터를 그리기
    monster.draw(ctx, scrollOffset, monsterImage)
  })
}

export const drawMeats = (
  ctx: CanvasRenderingContext2D,
  meats: Meat[],
  scrollOffset: number
) => {
  meats.forEach((meat) => {
    // appearance에 맞는 이미지를 가져옴
    const meatImage = meatAppearances[meat.appearance || 'default']

    // 이미지가 로드되지 않았으면 경고 출력 후 건너뜀
    if (!meatImage || !meatImage.complete) {
      console.warn(
        `Image for appearance '${meat.appearance}' is not loaded yet.`
      )
      return
    }

    meat.draw(ctx, scrollOffset, meatImage)
  })
}

export const drawWings = (
  ctx: CanvasRenderingContext2D,
  wings: Wing[],
  scrollOffset: number
) => {
  wings.forEach((wing) => {
    // appearance에 맞는 이미지를 가져옴
    const wingImage = wingAppearances[wing.appearance || 'default']

    // 이미지가 로드되지 않았으면 경고 출력 후 건너뜀
    if (!wingImage || !wingImage.complete) {
      console.warn(
        `Image for appearance '${wing.appearance}' is not loaded yet.`
      )
      return
    }

    wing.draw(ctx, scrollOffset, wingImage)
  })
}

export const drawLives = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  heartImage: HTMLImageElement
) => {
  if (!heartImage.complete) return
  for (let i = 0; i < player.lives; i++) {
    ctx.drawImage(heartImage, 20 + i * 30, 10, 20, 20)
  }
}

export const drawBackground = (
  ctx: CanvasRenderingContext2D,
  backgroundImage: HTMLImageElement,
  canvas: any
) => {
  ctx.drawImage(backgroundImage, 0, 0, canvas?.width || 0, canvas?.height || 0)

  // 상단 코인
  // const coinImage = coinAppearances.default
  // ctx.drawImage(coinImage, 680, 10, 25, 25)
}

export const drawCollectedCoins = (
  ctx: CanvasRenderingContext2D,
  coinImage: HTMLImageElement,
  canvas: any,
  collectedCoins: number
) => {
  const iconSize = 25
  ctx.drawImage(coinImage, (canvas?.width || 0) - 100, 10, iconSize, iconSize) // 코인 아이콘
  ctx.font = '20px Arial'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'left'
  ctx.fillText(`x ${collectedCoins}`, (canvas?.width || 0) - 65, 32) // 코인 개수 텍스트
}
