export class Point {
    constructor(index, x, y, ordinal) {
        this.x = x;
        this.y = y;
        this.centerY = y;
        this.fixedY = y;
        this.prevFixedY = this.fixedY;
        this.index = index + 1;
        this.cur = (index + 1) * 6;
        this.max = y;
        this.moveRatio = (this.max * 2) / 210;
        this.wave = null;
        this.autoCur = ordinal;
        this.speed = 0.1;
        this.autoMax = 0;

        document.addEventListener('mousemove', this.mouseMove.bind(this), false);
    }

    mouseMove(e) {
        let pointX = e.pageX;
        let pointY = e.pageY;

        if (pointY < this.centerY) {
            if (this.x < pointX) this.fixedY = this.centerY - (1 / (pointX - this.x + 300)) * Math.abs(this.centerY - pointY) * 300;
            else if (this.x > pointX) this.fixedY = this.centerY - (1 / (this.x - pointX + 300)) * Math.abs(this.centerY - pointY) * 300;

            if (this.fixedY < this.prevFixedY) {
                this.prevFixedY = this.fixedY;
                this.max = this.centerY - this.prevFixedY;
            }

            if (this.y > this.fixedY) this.prevFixedY = this.centerY;

            this.wave = true;
        } else {
            if (this.x < pointX) this.fixedY = this.centerY + (1 / (pointX - this.x + 300)) * Math.abs(this.centerY - pointY) * 300;
            else if (this.x > pointX) this.fixedY = this.centerY + (1 / (this.x - pointX + 300)) * Math.abs(this.centerY - pointY) * 300;

            if (this.fixedY > this.prevFixedY) {
                this.prevFixedY = this.fixedY;
                this.max = this.prevFixedY - this.centerY;
            }

            if (this.y < this.fixedY) this.prevFixedY = this.centerY;

            this.wave = false;
        }

        this.moveRatio = (this.max * 2) / 6;
    }

    update() {
        if (this.wave === true) {
            this.y -= this.moveRatio;

            if (this.y <= this.centerY - this.max) {
                this.max /= 1.3;
                this.moveRatio = (this.max * 2) / 10;
                this.wave = false;
            }
        } else if (this.wave === false) {
            this.y += this.moveRatio;

            if (this.y >= this.centerY + this.max) {
                this.max /= 1.3;
                this.moveRatio = (this.max * 2) / 10;
                this.wave = true;
            }
        }

        if (this.wave != null && this.max < 10) {
            this.y = this.centerY;
            this.wave = null;
            this.cur = this.index * 6;
        }

        if (this.max < 10) {
            this.autoCur += this.speed;
            if (this.autoMax < 10) this.autoMax += 0.1;
            this.y = this.centerY + Math.sin(this.autoCur) * this.autoMax;
        }
    }
}
