/*
Deobfuscation by @lexfridman C++ Source:
https://www.dropbox.com/s/79ga2m7p2bnj1ga/donut_deobfuscated.c?dl=0

Original (and much more beautiful) + explanation:
https://www.a1k0n.net/2011/07/20/donut-math.html

JS translation and general ugliness and bad practice: patrickoliveras@gmail.com
*/

function donut() {
  const canvas = document.querySelector('#canvas');

  const canvasWidth = 220;
  const canvasHeight = 40;
  const canvasArea = canvasHeight * canvasWidth; //캔버스 전체 넓이를 선언했다.
  const yOffset = 14; //y축 아래방향으로 얼마나 이동해 있는지 보여준다.
  const xOffset = 40; //x축 아래방향으로 얼마나 이동해 있는지 보여준다.
  const innerRadius = 2; //도넛 구멍 중앙부터 통로 원의 중심까지의 반지름 R2역할을 한다.
  const r1Points = 90; // 90 선풍기 날개에 색깔을 칠한다. r1을 따라 그림. 전방에서 볼 때 동그랗게 그려진다.
  const r2Points = 314; // 314 선풍기 날개 개수. 도넛의 단면을 잘랐을 때 나오는 원을 그린다.
  const fov = 5; //대상과의 거리 즉 constant z를 나타내는 듯

  const what = 30; //대상과의 거리같은데 fov와 what 중 하나는 z 하나는 z'일 것이다.

  let A = 0; //x축 기준 회전도
  let B = 0; // 아마 z축 기준으로 회전 A=0일 때 전면 움직임 보이지 않음

  let shades = '.,-~:;=!*#$@'.split(''); //나중에 shade로 쓸 것 미리 따놓기
  // let shades = 'patrick PATRICK'.split('');

  // buffers
  let b, z;

 //let interval = setInterval(() => {
    b = Array(canvasArea).fill(' '); //표면의 캔버스 에어리어에 공백을 가득채운다. 도화지를 까는 것
    z = Array(7040).fill(0); // z-buffer set to z^-1 : 안 보이는 뒷 공간에 z축을 위해 버퍼를 만든다.

    for (let j = 0; j < 6.28; j += 6.28 / r1Points) { //세타 통로 회전
      for (let i = 0; i < 6.28; i += 6.28 / r2Points) { //파이 총 회전
        let c = Math.sin(i);  //sin파이
        let d = Math.cos(j);  //cos세타
        let e = Math.sin(A);  //상수 sinA
        let f = Math.sin(j);  //sin세타
        let g = Math.cos(A);  //상수 cosA

        let h = d + innerRadius; 

        let D = 1 / (c * h * e + f * g + fov); //바로 Z^-1값

        let l = Math.cos(i);
        let m = Math.cos(B);
        let n = Math.sin(B);
        let t = c * h * g - f * e; //sini * (d + innerRadius) * cosA - sinj * sinA

        // floored floats a.k.a. ints
        let x = (xOffset + what * D * (l * h * m - t * n)) << 0; //<<0은 소수점 아래를 잘라내기 위해 쓴다. parseInt를 써도 되더라.
        let y = (yOffset + (what / 2) * D * (l * h * n + t * m)) << 0;
        let o = (x + canvasWidth * y) << 0;
        let shadeConstant = (((shades.length + 1) * 2) / 3) << 0; // ceil(shade.length * (2/3))
        let N =
          (shadeConstant *
            ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n)) <<
          0;

        if (canvasHeight > y && y > 0 && x > 0 && canvasWidth > x && D > z[o]) {
          z[o] = D;
          b[o] = shades[N > 0 ? N : 0];
        }
      }
    }

    canvas.innerHTML = '';
    let line = [];

    for (let k = 0; k < canvasArea + 1; k++) {
      if (k % canvasWidth) {
        line.push(b[k]);
      } else {
        canvas.innerHTML += line.join('') + '<br />';
        line = [];
      }

      A += 0.00007;
      B += 0.00002;
    }
  //}, 100)
}

donut();
