import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import { AreaChart } from 'react-native-svg-charts'
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import * as shape from 'd3-shape'

export default class Dashboard extends Component {
    render() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3aa792',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    }
});
