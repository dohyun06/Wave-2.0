import { WaveGroup } from './wavegroup.js';

class App {
    /* 가장 처음 시작되는 함수 */
    constructor() {
        this.canvas = document.createElement('canvas'); /* canvas 생성 */
        this.ctx = this.canvas.getContext('2d'); /* 2차원 렌더링 */
        document.body.appendChild(this.canvas); /* body에 canvas 추가 */

        this.waveGroup = new WaveGroup(); /* WaveGroup 클래스 선언 */

        window.addEventListener('resize', this.resize.bind(this), false); /* 화면 크기 재조정 감지 시 resize 실행 */
        this.resize(); /* resize 실행 */

        requestAnimationFrame(this.animate.bind(this)); /* animate 실행 */
    }

    /* 크기 조절 함수 */
    resize() {
        this.stageWidth = document.body.clientWidth; /* 너비 : 사용자 창 너비 */
        this.stageHeight = document.body.clientHeight; /* 높이 : 사용자 창 높이 */

        this.canvas.width = this.stageWidth * 2; /* canvas 너비 : 화면 너비 * 2 */
        this.canvas.height = this.stageHeight * 2; /* canvas 높이 : 화면 높이 * 2 */
        this.ctx.scale(2, 2); /* canvas 확대 */

        this.waveGroup.resize(this.stageWidth, this.stageHeight); /* WaveGroup에 resize 실행 */
    }

    /* 애니메이션 함수 */
    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight); /* canvas 지움 */

        this.waveGroup.draw(this.ctx); /* WaveGroup에 draw 실행 */

        requestAnimationFrame(this.animate.bind(this)); /* animate 실행 (animate를 계속해서 반복) */
    }
}

/* window에 App클래스 실행 */
window.onload = () => {
    new App();
};
