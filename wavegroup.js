import { Wave } from './wave.js';

export class WaveGroup {
    /* 가장 처음 시작되는 함수 */
    constructor() {
        this.totalWaves = 3; /* 파도 개수 3개 */
        this.totalPoints = 16; /* 움직일 기준 점 6개 */

        this.color = ['rgba(0,199,235,0.4)', 'rgba(0,146,199,0.4)', 'rgba(0,87,158,0.4)']; /* 색 설정 */

        this.waves = []; /* 파도를 모아놓을 array */

        /* 파도 수 만큼 Wave클래스 실행 */
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]); /* 몇 번째 파도인지, 기준점의 수, 색 전달 */
            this.waves[i] = wave; /* waves array에 Wave클래스 선언 */
        }
    }

    /* 크기 조절 함수 */
    resize(stageWidth, stageHeight) {
        /* 파도 수 만큼 조절 */
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i]; /* 각 파도의 Wave클래스를 불러옴 */
            wave.resize(stageWidth, stageHeight); /* Wave클래스의 resize함수 실행 */
        }
    }

    /* 그리기 함수 */
    draw(ctx) {
        /* 파도 수 만큼 그림 */
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i]; /* 각 파도의 Wave클래스를 불러옴 */
            wave.draw(ctx); /* Wave클래시의 draw함수 실행 */
        }
    }
}
