import * as React from 'react';

type Props = {|
    saleName: String,
|};

type State = {|
    itemDescription: String,
|};


class DisplayDescription extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            itemDescription: '',
        }
    }

    selectItemDesc(): void {
    }

    render(): React.Node {

        const itemDesc = this.selectItemDesc();
        return (
            <div>{itemDesc}</div>
        );
    }
}

export default DisplayDescription;