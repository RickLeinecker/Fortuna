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
        canvas.width = 300;
        canvas.height = 300;
        ctx.fillStyle = "#04CCFF";
        ctx.fillRect(0, 0, 300, 300);

        // Once mounted, parse through the tank array and render all components.
        let i: number = 0;

        if(this.props.tank != null) {
            for(i; i < this.props.tank.length; i++) {
                const component = new Image();
                component.src = this.props.tank[i] + ".png";
                component.onload = () => {
                    ctx.drawImage(component, 100, 100, 100, 100);
               };
            }
        }
    }

    render(): React.Node {
        return (
            <div className="tankCanvas">
                <canvas ref="canvas" />
            </div>
        );
    }
}

export default RenderTank;