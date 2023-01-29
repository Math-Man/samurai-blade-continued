export function aimTargetedDotValue(targetPosition: Vector, playerPosition: Vector, playerAimDirection: Vector): float {
  return targetPosition.sub(playerPosition).Normalized().Dot(playerAimDirection);
}

export function atan2(y: float, x: float): float {
  return math.atan(y / x);
}

export function signedAngleBetween(vec1: Vector, vec2: Vector): float {
  return (atan2(vec2.Y - vec1.Y, vec2.X - vec1.X) * 180) / math.pi;
}

export function signedAngleDotValue(targetPosition: Vector, playerPosition: Vector, playerAimDirection: Vector): float {
  return aimTargetedDotValue(targetPosition, playerAimDirection, playerAimDirection) * Math.sign(signedAngleBetween(targetPosition, playerPosition)) * playerAimDirection.X < 0 || playerAimDirection.Y > 0 ? -1.0 : 1.0;
}
