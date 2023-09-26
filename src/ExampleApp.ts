/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */
import * as gfx from 'gophergfx'

export class ExampleApp extends gfx.GfxApp
{   

    private pacman: gfx.Mesh2;
    private mouth: gfx.Mesh2;
    private elapsedTime: number;


    // --- Create the ExampleApp class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();


        this.mouth = new gfx.Mesh2();
        this.pacman = new gfx.Mesh2();
        this.elapsedTime = 0;
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // different values for viewport adjust how the graphics canvas
        // is fit within the browser's window.  The default is FIT.
        this.renderer.viewport = gfx.Viewport.FIT;
        //this.renderer.viewport = gfx.Viewport.STRETCH;

        // this sets the background color for clearing the screen at the beginning
        // of each frame.
        this.renderer.background = new gfx.Color(0.226, 0.450, 0.610);

        // if we want a texture rather than a color to fill the screen, then we
        // need to create some geometry to paste the texture onto.  this creates
        // a rectangle this is centered at 0,0 and is 2 units in width and height,
        // making it the perfect size to cover the entire graphics canvas.
        const bgRect = gfx.Geometry2Factory.createBox(2, 2);
        this.scene.add(bgRect);

        //bgRect.material.color = gfx.Color.BLACK;
        bgRect.material.texture = new gfx.Texture('assets/pac-background.png');


        //this.pacman = gfx.Geometry2Factory.createCircle(0.2, 50);
        this.pacman = gfx.Geometry2Factory.createPieSlice(0.2, Math.PI/10, -Math.PI/10);
        this.scene.add(this.pacman);
        this.pacman.material.color = gfx.Color.YELLOW;
        //this.pacman.position = new gfx.Vector2(1,1);

        /* 
        // the face made of rectangles example
        this.scene.add(gfx.Geometry2Factory.createBox(0.2, 0.2));
        const rect1 = gfx.Geometry2Factory.createBox(0.2, 0.2);
        this.scene.add(rect1);
        rect1.position = new gfx.Vector2(-0.5, 0.5);
        const rect2 = gfx.Geometry2Factory.createBox(0.2, 0.2);
        this.scene.add(rect2);
        rect2.position = new gfx.Vector2(0.5, 0.5);
        this.mouth = gfx.Geometry2Factory.createBox(1.2, 0.3);
        this.scene.add(this.mouth);
        this.mouth.position = new gfx.Vector2(0, -0.5);
        */
    }


    onKeyDown(event: KeyboardEvent): void {
        if (event.key == 'ArrowUp') {
            this.pacman.position.y += 0.1;
        }
        else if (event.key == 'ArrowDown') {
            this.pacman.position.y -= 0.1;
        }
    }

    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.elapsedTime += deltaTime;

        // give me a variable than animates smoothly over time
        const a = Math.sin(this.elapsedTime);
        // speed it up a bit
        const b = Math.sin(6 * this.elapsedTime);
        // adjust so that it never goes negative
        const c = Math.abs(b);

        this.mouth.scale = new gfx.Vector2(1, Math.abs(Math.sin(6 * this.elapsedTime)));

        // move pacman across the screen
        this.pacman.position.x += 0.01;
        if (this.pacman.position.x > 1.5) {
            this.pacman.position.x = -1.5;
        }

        // determine a good equation to control pacman's chomping
        const speed = 6.0;
        const cycleNeg1Pos1 = Math.sin(speed * this.elapsedTime);
        const cycleZeroTwo = cycleNeg1Pos1 + 1;
        const cycleZeroOne = cycleZeroTwo / 2;
        const cycleZeroPiOver5 = cycleZeroOne * Math.PI/5;

        // this is the same thing as above, just written more compactly
        //const angle = (Math.sin(speed * this.elapsedTime) + 1) * Math.PI * 5 / 2;

        // changing the shape of the pacman geometry is a bit more complex. you might
        // think we should do this:
        //   this.pacman = gfx.Geometry2Factory.createPieSlice(0.2, cycleZeroPiOver5, -cycleZeroPiOver5);
        // this is almost correct, but it doesn't work because it replaces this.pacman
        // with a new Mesh2.  since this new Mesh2 is never added to the scene, it
        // doesn't even get drawn.  Instead, what we want to do is *update* the geometry
        // data inside the existing Mesh2 that has already been added to the scene.  We
        // can do that by creating a new Mesh2 with the desired geometry and then just
        // copy over the vertices.  
        const tmpMesh = gfx.Geometry2Factory.createPieSlice(0.2, cycleZeroPiOver5, -cycleZeroPiOver5);
        this.pacman.setVertices(tmpMesh.getVertices());

        // we have animated position and scale, what else could we try animating?
        this.pacman.rotation = this.elapsedTime;
        this.pacman.material.color = new gfx.Color(cycleZeroOne, 1 - cycleZeroOne, cycleZeroOne);

        /*
        // increase background color until completely white
        // commented out because the boxes drawn above are also white, so
        // we cannot see them on a white background
        if (this.renderer.background.r < 1.0) {
            this.renderer.background.r += 0.01;
            this.renderer.background.g += 0.01;
            this.renderer.background.b += 0.01;
            console.log(this.renderer.background.r);
        }
        */
    }
}