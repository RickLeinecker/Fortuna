//@flow strict

import * as React from 'react';

type Props = {|
    tank: ?Array<string>
|};

class RenderTank extends React.Component<Props> {

    componentDidMount(): void {
        const canvas: HTMLCanvasElement = this.refs.canvas;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        // Create Background.
        const grad = ctx.createRadialGradient(75, 50, 10, 90, 60, 100);
        grad.addColorStop(0, "#04CCFF");
        grad.addColorStop(1, "#000921");
        ctx.fillStyle = grad;
        ctx.fillRect(10, 10, 150, 80);

        // Once mounted, parse through the tank array and render all components.
        const component = new Image();
        let i: number = 0;

        if(this.props.tank != null) {
            for(i; i < this.props.tank.length; i++) {
                component.src = this.props.tank[i] + ".png";
                component.onload = () => {
                    ctx.drawImage(component, 0, 0, 100, 100);
               };
            }
        }
    }

    render(): React.Node {
        return (
            <div>
                <canvas className="tankCanvas" ref="canvas" />
            </div>
        );
    }
}

export default RenderTank;