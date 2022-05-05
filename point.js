export class Point {
    /* 가장 처음 시작되는 함수 */
    constructor(index, x, y, ordinal) {
        this.x = x; /* 기준점의 x값 */
        this.y = y; /* 기준점의 y값 */
        this.fixedY = y; /* 기준 y값 (화면 높이의 중앙 값) */
        this.index = index;
        this.cur = index * 8; /* 파도 번호 + 파도의 기준점 번호 */
        this.max = y;
        this.maxRatio = y / 10;
        this.moveRatio = 0;
        this.moveCnt = 0;
        this.waveCnt = 0;
        this.wave = true;
        this.onClick = null;
        this.autoCur = ordinal;
        this.speed = 0.1;
        this.autoMax = 0;

        document.addEventListener('mousedown', this.mouseDown.bind(this), false);
        document.addEventListener('mouseup', () => (this.onClick = false), false);
    }

    mouseDown(e) {
        this.reset();
        this.onClick = true;
        document.addEventListener('mousemove', this.mouseMove.bind(this), false);
        this.mouseMove(e);
    }

    mouseMove(e) {
        if (this.onClick === true) {
            let pointX = e.pageX;
            let pointY = e.pageY;

            if (pointY < this.fixedY) {
                if (this.x < pointX) this.y = this.fixedY - (1 / (pointX - this.x + 300)) * Math.abs(this.fixedY - pointY) * 300;
                else if (this.x > pointX) this.y = this.fixedY - (1 / (this.x - pointX + 300)) * Math.abs(this.fixedY - pointY) * 300;

                this.max = this.fixedY - this.y;
                this.wave = false;
            } else {
                if (this.x < pointX) this.y = this.fixedY + (1 / (pointX - this.x + 300)) * Math.abs(this.fixedY - pointY) * 300;
                else if (this.x > pointX) this.y = this.fixedY + (1 / (this.x - pointX + 300)) * Math.abs(this.fixedY - pointY) * 300;

                this.wave = true;
                this.max = this.y - this.fixedY;
            }

            this.moveRatio = (this.max * 2) / 10;
            this.maxRatio = this.max / 25;
        }
    }

    /* 기준점 위치 업데이트 함수 */
    update() {
        if (this.onClick === false && this.cur === 0) {
            if (this.wave === true) {
                this.y -= this.moveRatio;
                this.moveCnt++;

                if (this.moveCnt === 10) {
                    this.moveCnt = 0;
                    this.max -= this.maxRatio;
                    this.moveRatio = (this.max * 2) / 10;
                    this.waveCnt++;
                    this.wave = false;
                }
            } else if (this.wave === false) {
                this.y += this.moveRatio;
                this.moveCnt++;

                if (this.moveCnt === 10) {
                    this.moveCnt = 0;
                    this.max -= this.maxRatio;
                    this.moveRatio = (this.max * 2) / 10;
                    this.waveCnt++;
                    this.wave = true;
                }
            }

            if (this.waveCnt === 25) {
                this.y = this.fixedY;
                this.waveCnt = 0;
                this.onClick = null;
                this.cur = this.index * 8;
            }
        } else if (this.onClick === false && this.cur > 0) this.cur--;
        else if (this.onClick === null) {
            this.autoCur += this.speed;
            if (this.autoMax < 10) this.autoMax += 0.1;
            this.y = this.fixedY + Math.sin(this.autoCur) * this.autoMax;
        }
    }

    reset() {
        this.cur = this.index * 8;
        this.moveCnt = 0;
        this.waveCnt = 0;
        this.autoMax = 0;
    }
}
