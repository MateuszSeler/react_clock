import React from 'react';
import './App.scss';
import { Clock } from './Clock';

type Props = {};
type State = {
  hasClock: boolean;
  name: string;
};

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component<Props, State> {
  state: State = {
    hasClock: true,
    name: 'Clock-0',
  };

  private interval: number | null = null;

  componentDidMount(): void {
    this.startInterval();

    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      this.setState({ hasClock: false });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.name} />}
      </div>
    );
  }

  startInterval(): void {
    if (this.interval !== null) {
      return;
    }

    this.interval = window.setInterval(() => {
      const prevName: string = this.state.name;

      this.setState({ name: getRandomName() }, () => {
        if (this.state.hasClock) {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${prevName} to ${this.state.name}`);
        }
      });
    }, 3300);
  }

  stopInterval(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
