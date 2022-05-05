import { Point } from './point.js';

export class Wave {
    /* 가장 처음 시작되는 함수 */
    constructor(index, totalPoints, color) {
        this.index = index; /* 전달 받은 파도 번호 */
        this.totalPoints = totalPoints; /* 전달 받은 기준점 개수 */
        this.color = color; /* 전달 받은 색 */
        this.points = []; /* 기준점 array */
    }

    /* 크기 조절 함수 */
    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth; /* 화면 너비 */
        this.stageHeight = stageHeight; /* 화면 높이 */

        this.centerX = stageWidth / 2; /* 화면 너비의 중앙 */
        this.centerY = stageHeight / 2; /* 화면 높이의 중앙 */

        this.pointGap = this.stageWidth / (this.totalPoints - 2); /* 점과의 거리 */

        this.init(); /* init 실행 */
    }

    /* 기준점 조절하기 함수 */
    init() {
        this.points = []; /* array 비움 */

        /* 점 수 만큼 움직임 */
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(this.index, this.pointGap * (i - 0.5), this.centerY, this.index * 1.5 + i); /* 각 점의 Point클래스 불러옴 */
            this.points[i] = point; /* points array에 Point클래스 선언 */
        }
    }

    /* 그리기 함수 */
    draw(ctx) {
        /* if (this.index === 0)
            for (let i = 0; i < this.totalPoints; i++) {
                ctx.beginPath();
                ctx.arc(this.points[i].x, this.points[i].y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.closePath();
            } */

        ctx.beginPath(); /* 경로 시작 */

        ctx.fillStyle = this.color; /* 색 설정 */

        let prevX = this.points[0].x; /* 첫 이전 x값 = 첫 기준점 x값 */
        let prevY = this.points[0].y; /* 첫 이전 y값 = 첫 기준점 y값 */

        ctx.moveTo(prevX, prevY); /* prevX, prevY에서 시작 */

        /* 2번째 기준점 부터 그림 */
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].update(); /* 첫 번째 기준점이나 마지막 기준점이 아니면 Point클래스에 update 실행 */

            const cx = (prevX + this.points[i].x) / 2; /* cx는 이전 x값과 기준점의 중점 */
            const cy = (prevY + this.points[i].y) / 2; /* cy는 이전 y값과 기준점의 중점 */

            ctx.quadraticCurveTo(prevX, prevY, cx, cy); /* 곡선 그림 */

            prevX = this.points[i].x; /* 다음 이전 x값 = 현재 x값 */
            prevY = this.points[i].y; /* 다음 이전 y값 = 현재 y값 */
        }

        ctx.lineTo(prevX, prevY); /* 마지막 점까지 선 긋기 */
        ctx.lineTo(this.stageWidth, this.stageHeight); /* 화면 우측 하단으로 선 긋기 */
        ctx.lineTo(this.points[0].x, this.stageHeight); /* 화면 좌측 하단으로 선 긋기 */
        ctx.fill(); /* 선이 그어진 곳 칠하기 */
        ctx.closePath(); /* 경로 종료 */
    }
}
