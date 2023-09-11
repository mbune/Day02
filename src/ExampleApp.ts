/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'


export class ExampleApp extends gfx.GfxApp
{   
    private mouth: gfx.Mesh2;
    private elapsedTime: number;

    // --- Create the ExampleApp class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.mouth = new gfx.Mesh2();
        this.elapsedTime = 0;
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.renderer.background = new gfx.Color(0.226, 0.450, 0.610);

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

    }


    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.elapsedTime += deltaTime;
        this.mouth.scale = new gfx.Vector2(1, Math.abs(Math.sin(this.elapsedTime)));
    }
}
