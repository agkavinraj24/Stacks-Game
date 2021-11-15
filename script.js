let canvas = document.getElementById("stacks");
let context = canvas.getContext("2d");
context.font = 'bold 30px sans-serif';
let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 50;
let boxes = [];
boxes[0] = 
{
    x: 300,
    y: 300,
    width: 200
};
let reduce = 
{
    x: 0,
    width: 0
};
function new_box() 
{
    boxes[current] = {
        x: 0,
        y: (current + 10) * height,
        width: boxes[current - 1].width
    };
}
function finish() 
{
    mode = 'finish';
    context.fillText('Game over.Better luck next Time.', 150, 150);
}
function animate() 
{
    if (mode != 'finish') 
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText('Score: ' + (current - 1).toString(), 750, 100);
        for (let n = 0; n < boxes.length; n++) 
        {
            let box = boxes[n];
            context.fillRect(box.x, 600 - box.y + cameraY, box.width, height);
        }
        context.fillStyle = 'black';
        context.fillRect(reduce.x, 600 - reduce.y + cameraY, reduce.width, height);
        if (mode == 'bounce') 
        {
            boxes[current].x = boxes[current].x + xSpeed;
            if (xSpeed > 0 && boxes[current].x + boxes[current].width > canvas.width)
                xSpeed = -xSpeed;
            if (xSpeed < 0 && boxes[current].x < 0)
                xSpeed = -xSpeed;
        }
        if (mode == 'fall') 
        {
            boxes[current].y = boxes[current].y - ySpeed;
            if (boxes[current].y == boxes[current - 1].y + height) 
            {
                mode = 'bounce';
                let difference = boxes[current].x - boxes[current - 1].x;
                if (Math.abs(difference) >= boxes[current].width) 
                {
                    finish();
                }
                reduce = {
                y: boxes[current].y,
                width: difference
            };
            if (boxes[current].x > boxes[current - 1].x) 
            {
                boxes[current].width = boxes[current].width - difference;
                reduce.x = boxes[current].x + boxes[current].width;
            } 
            else 
            {
                reduce.x = boxes[current].x - difference;
                boxes[current].width = boxes[current].width + difference;
                boxes[current].x = boxes[current - 1].x;
            }
            current++;
            scrollCounter = height;
            new_box();
        }
    }
    if (scrollCounter) 
    {
        cameraY++;
        scrollCounter--;
    }
    }
    window.requestAnimationFrame(animate);
}
function restart() 
{
    boxes.splice(1, boxes.length - 1);
    mode = 'bounce';
    cameraY = 0;
    scrollCounter = 0;
    xSpeed = 2;
    current = 1;
    new_box();
    reduce.y = 0;
}
canvas.onpointerdown = function() 
{
    if (mode == 'finish')
        restart();
    else 
    {
        if (mode == 'bounce')
        mode = 'fall';
    }
};
restart();
animate();