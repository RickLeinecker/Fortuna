//@flow strict

import * as React from 'react';

type Props = {|
    tank: Array<string>
|};

// Render Tank Component. Takes an array of tank components and renders their images.
//
// Props Names:
// tank (Pass the array of components to render the images)
//
// EXAMPLE PROP USAGE = <RenderTank tank={ ["moddable", "machineGun", "shortRangeScanner", "shortRangeJammer", "advancedTreads", "c4", "mine"] }
//
// Needs to be updated to correctly parse through the assets/art folders.

class RenderTank extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        // Tracks category for each component.
        const componentCategories: Map<string, string> = new Map();
		// Chassis:
		componentCategories.set("moddableLight", "chassis");
		componentCategories.set("light", "chassis");
		componentCategories.set("moddable", "chassis");
		componentCategories.set("heavy", "chassis");
		componentCategories.set("moddableHeavy", "chassis");
		// Weapons:
		componentCategories.set("machineGun", "weapons");
		componentCategories.set("grenadeLauncher", "weapons");
		componentCategories.set("missile", "weapons");
		componentCategories.set("shotgun", "weapons");
		componentCategories.set("vulcanCannon", "weapons");
		componentCategories.set("laser", "weapons");
		componentCategories.set("plasma", "weapons");
		componentCategories.set("pulseLaser", "weapons");
		componentCategories.set("lancer", "weapons");
		componentCategories.set("deathRay", "weapons");
		// Scanner:
		componentCategories.set("shortRangeScanner", "scanners");
		componentCategories.set("mediumRangeScanner", "scanners");
		componentCategories.set("longRangeScanner", "scanners");
		componentCategories.set("itemScanner", "scanners");
		componentCategories.set("antiJammerScanner", "scanners");
		// Jammer:
		componentCategories.set("shortRangeJammer", "jammers");
		componentCategories.set("mediumRangeJammer", "jammers");
		componentCategories.set("longRangeJammer", "jammers");
		// Treads:
		componentCategories.set("advancedTreads", "treads");
		componentCategories.set("fastTreads", "treads");
		componentCategories.set("armoredTreads", "treads");
		componentCategories.set("heavilyArmoredTreads", "treads");
		// Items:
		componentCategories.set("mine", "items");
		componentCategories.set("c4", "items");
		componentCategories.set("nitroRepair", "items");
		componentCategories.set("overdrive", "items");
		componentCategories.set("missileTrackingBeacon", "items");
    }

    componentDidMount = () => {

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
                component.src = "../assets/art/" + this.componentCategories.get(this.props.tank[i]) + this.props.tank[i] + ".png";
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