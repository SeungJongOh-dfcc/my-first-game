export const GRAVITY = 0.4
export const MAX_FALL_SPEED = 10 // 최대 하강 속도
export const JUMP_STRENGTH = -11
export const EXPERIENCE_PER_LEVEL = [0, 100, 300, 600, 1000, 1500, 2200, 3000] // 레벨별 필요 경험치

// 이미지 객체를 생성하는 함수
export function createImage(src: string): HTMLImageElement {
  const img = new Image()
  img.src = src
  return img
}
