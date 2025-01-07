export const GRAVITY = 0.4
export const JUMP_STRENGTH = -11

// 이미지 객체를 생성하는 함수
export function createImage(src: string): HTMLImageElement {
  const img = new Image()
  img.src = src
  return img
}
