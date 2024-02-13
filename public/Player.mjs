export class Player {
  constructor({ x, y, score, id, color }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.color = color;
  }

  movePlayer(dir, speed) {
    switch (dir) {
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
      case "left":
        this.x -= speed;
        break;
      case "right":
        this.x += speed;
        break;
      default:
        break;
    }
  }

  collision(item) {
    // Calculate bounding boxes for player and item
    const playerLeft = this.x - 5; // Assuming player radius is 5
    const playerRight = this.x + 5; // Assuming player radius is 5
    const playerTop = this.y - 5; // Assuming player radius is 5
    const playerBottom = this.y + 5; // Assuming player radius is 5

    const itemLeft = item.x - 5; // Assuming item radius is 5
    const itemRight = item.x + 5; // Assuming item radius is 5
    const itemTop = item.y - 5; // Assuming item radius is 5
    const itemBottom = item.y + 5; // Assuming item radius is 5

    // Check for collision by comparing bounding boxes
    if (
      playerRight > itemLeft &&
      playerLeft < itemRight &&
      playerBottom > itemTop &&
      playerTop < itemBottom
    ) {
      return true; // Collision detected
    } else {
      return false; // No collision
    }
  }

  calculateRank(players) {
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    const index = sortedPlayers.findIndex((player) => player.id === this.id);
    const rank = index + 1;
    return `Rank: ${rank}/${players.length}`;
  }
}
