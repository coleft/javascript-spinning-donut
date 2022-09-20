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

    const z = 30;

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

                let 
            }
        }
    }, 90)
}