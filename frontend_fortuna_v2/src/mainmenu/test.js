new Vue({
  el: '#grid',
  
  data: {
    grid: [],
    start: null,
    target: null,
    traversed: []
  },
  
  mounted() {
    let width = Math.floor(window.innerWidth/80);
    let height = Math.floor(window.innerHeight/80);
    
    for (let i = 0; i <= height; i++) {
      this.grid.push([]);
       for (let j = 0; j < width; j++) {
        this.grid[i].push({ 
          status: "off",
          x: i, y: j
        });
      } 
    } 
  },
  watch: {
    start: function (fresh, previous) {
      if (fresh) fresh.status = "start";
      else this.target = null;
      
      if (previous) previous.status = "off";
    },
     target: function (fresh, previous) {
      if (fresh) fresh.status = "end";
      if (previous) previous.status = "off";
      
      this.updatePath();
    }
  },
  methods: {
    select: function (cell) {
        if (!this.start)
          this.start = cell;
        else if (cell.status === "start")
          this.start = null;
        else if (cell.status === "end")
          this.target = null;
        else
          this.target = cell;
    },
    setStartPosition: function (cell) {
      cell.status = "start"
    },
    updatePath() {
      this.traversed
        .filter(c => c.status === "traversed")
        .forEach(c => c.status = "off");
        
      this.traversed = [];
      
      if (!this.start || !this.target)
        return;
      
      let traversed = raytrace({x: this.start.x + 0.5, y: this.start.y + 0.5},
                               {x: this.target.x + 0.5, y: this.target.y + 0.5});
      
      this.traversed = traversed
          .map(coords => this.grid[coords.x][coords.y])
          .filter(c => c.status === "off");
           
      this.traversed.forEach(c => c.status = "traversed");  
    }
  }
})

function raytrace(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;

    let directionX = Math.sign(dx);
    let directionY = Math.sign(dy);
    let directionModifierX = directionX < 0 ? 0 : directionX;
    let directionModifierY = directionY < 0 ? 0 : directionY;

    let currentCell = {x: Math.floor(a.x), y: Math.floor(a.y)};
    let targetCell = {x: Math.floor(b.x), y: Math.floor(b.y)};

    let traversed = [{x: currentCell.x, y: currentCell.y}];

    let calcIntersectionDistanceX = () => Math.abs(dy * (currentCell.x + directionModifierX - a.x));
    let calcIntersectionDistanceY = () => Math.abs(dx * (currentCell.y + directionModifierY - a.y));

    let intersectionDistanceX = dx === 0 ? Infinity : calcIntersectionDistanceX();
    let intersectionDistanceY = dy === 0 ? Infinity : calcIntersectionDistanceY();

    while (targetCell.x !== currentCell.x || targetCell.y !== currentCell.y) {
        let xMove = intersectionDistanceX <= intersectionDistanceY;
        let yMove = intersectionDistanceY <= intersectionDistanceX;

        if (xMove) {
            currentCell.x += directionX;
            intersectionDistanceX = calcIntersectionDistanceX();
        }

        if (yMove) {
            currentCell.y += directionY;
            intersectionDistanceY = calcIntersectionDistanceY();
        }

        traversed.push({x: currentCell.x, y: currentCell.y});
    }

    return traversed;
}