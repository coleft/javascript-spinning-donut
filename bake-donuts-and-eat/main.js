function donut(){
    const space = document.querySelector("space");

    const width = 220;
    const height = 40;

    const screen = width * height;

    const yOffset = 14;
    const xOffset = 40;

    const radius = 2; //R2를 나타낸다. R1은 1로 잡음.
    
    const r1Pixel = 90;
    const r2Pixel = 314;

    //k1과 k2는 3차원 도형을 스크린에 투사할 때 비율을 조정해준다.
    const k1 = 30;
    const k2 = 5;

    let xSpin = 0;
    let zSpin = 0;

    let contrast = '.,-~:;=!*#$@'.split('');

    let bBuffer, zBuffer;

    let interval = setInterval(()=>{
        bBuffer = Array(screen).fill(' ');
        zBuffer = Array(8000).fill(0);

        for(let i = 0; i < 6.47; i += 6.47 / r1Pixel){ //세타 통로 단면 점찍기
            for(let j =0; j < 6.47; j += 6.47 / r2Pixel){  //파이 도넛모양으로 돌려찍기
                let sini = Math.sin(i); //세타 통로회전에 쓰임
                let sinj = Math.sin(j); //파이 도넛모양 회전에 쓰임
                let cosi = Math.cos(i);
                let cosj = Math.cos(j);

                let sinxSpin = Math.sin(xSpin);
                let sinzSpin = Math.sin(zSpin);
                let cosxSpin = Math.cos(xSpin);
                let coszSpin = Math.cos(zSpin);
                /* y축을 중심으로 회전시킬 때의 radius는 파이로 대체가능하다.
                따라서, 따로 변수를 정의할 필요가 없다.
                원래의 코드에서 y축 방향 회전이 구현되지 않았다.
                마지막에 추가할 예정이다. */
                
                /* 토르소를 만들고, x축과 z축을 중심으로 회전하는 부분까지의 수학적 결과물 (x, y, z) */

                // 도넛의 단면(베이글 자르는 방향이랑 수직)
                let section = sini + radius;

                // 도넛 z + k2 좌표값의 역수(스크린에 비출 때 k2만큼 평행이동 = 티비 떨어져서 봐라)
                // 함수 내부에 코사인과 사인 위치를 몇몇 바꿔서 도넛의 구멍이 전면을 바라보게 했다.
                let zReciprocal = 1 / (sinj * section * sinxSpin + sini * cosxSpin + k2);

                // z의 초기값
                let z = sinj * section * cosxSpin - sini * sinxSpin;

                // x좌표값과 y좌표값
                let x = (xOffset + k1 * zReciprocal * (cosj *section * coszSpin - z * sinzSpin)) << 0;
                let y = (yOffset + (k1 /2) * zReciprocal * (cosj * section * sinzSpin - z * coszSpin)) << 0;

                let coordinate = (x + width * y) << 0; //좌표 찍어준다.

                let lumConstant = (((shades.length + 1) * 2) / 3) << 0;

                let luminantN = (lumConstant * ((sini * sinxSpin - sinj * cosi * cosxSpin ) * coszSpin - sinj * cosi * sinxSpin - sini * cosxSpin - cosj * cosi * sinzSpin)) << 0;

                if (height > y && y > 0 &&
                    width > x && x > 0 &&
                    zReciprocal > zBuffer[coordinate])

            }
        }
    }, 90)
}