//Javascript Document

// sprite variables
var
    turkeySprite,
    backgroundSprite,
    foregroundSprite,
    bottomObstacleSprite,
    topObstacleSprite,
    gameoverSprite,
    titleSprite,
    okButtonSprite,
    fTX = 100,
    fTY = 260,
    fTW = 228,
    fTH = 30,
    gOX = 119,
    gOY = 295,
    gOW = 176,
    gOH = 47,
    oBX = 158,
    oBY = 399,
    oBW = 116,
    oBH = 32,
    turkey1w = 66,
    turkey1h = 46,
    turkey1x = 0,
    turkey1y = 0,
    turkey2h = 46,
    turkey2w = 66,
    turkey2x = 0,
    turkey2y = 56,
    turkey3w = 66,
    turkey3h = 46,
    turkey3x = 0,
    turkey3y = 102,
    overOKSprite;


// sprite constructor
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x * 2;
    this.y = y * 2;
    this.width = width * 2;
    this.height = height * 2;
}

// define draw method (prototype)
Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);

};
// initialize sprites
function initSprites(img) {
    turkeySprite = [
        new Sprite(img, turkey1x, turkey1y, turkey1w, turkey1h),
        new Sprite(img, turkey2x, turkey2y, turkey2w, turkey2h),
        new Sprite(img, turkey3x, turkey3y, turkey3w, turkey3h)
    ];
    //backgroundSprite.color = "#ABE1EE";
    backgroundSprite = new Sprite(img, 67, 0, 300, 246);
    foregroundSprite = new Sprite(img, 67, 341, 299, 35);
    okButtonSprite = new Sprite(img, oBX, oBY, oBW, oBH);
    titleSprite = new Sprite(img, fTX, fTY, fTW, fTH);
    bottomObstacleSprite = new Sprite(img, 376, 0, 49, 218);
    topObstacleSprite = new Sprite(img, 436, 0, 49, 218);
    gameoverSprite = new Sprite(img, gOX, gOY, gOW, gOH);
    overOKSprite = new Sprite(img, 415, 255, 48, 21);
}