import TickeableElement from "./TickeableElement";

export default function CollisionCheck(a: TickeableElement, b: TickeableElement): boolean {
  const aBoundaries = a.getBoundaries();
  const bBoundaries = b.getBoundaries();

  let horizontalCollision = false;
  let verticalCollision = false;

  if (aBoundaries.right >= bBoundaries.left && aBoundaries.right <= bBoundaries.right || aBoundaries.left >= bBoundaries.left && aBoundaries.left <= bBoundaries.right) {
    horizontalCollision = true;
  }

  if (aBoundaries.bottom <= bBoundaries.bottom && aBoundaries.bottom >= bBoundaries.top || aBoundaries.top <= bBoundaries.bottom && aBoundaries.top >= bBoundaries.top) {
    verticalCollision = true;
  }

  return horizontalCollision && verticalCollision;
}