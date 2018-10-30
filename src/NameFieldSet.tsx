import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import * as React from 'react';

interface INameFieldSetProps {
  setNames: (names: string[]) => void;
}

interface INameFieldSetState {
  names: string[]
}

export class NamesFieldSet extends React.Component<INameFieldSetProps, INameFieldSetState> {
  public state = {
    names: ["", ""]
  }

  public render () {
    const names = this.state.names.map((value: string, index: number) => {
      return (<div key={ index }>
                <TextField type="text"
                           label="Name"
                           value={ value } 
                           onChange={ this.changeName(index) }
                />
              </div>);
    });

    return (
      <Card>
        <CardContent>
            <Typography component="p">
              Who is splitting the bill? 
              <IconButton aria-label="Add person" onClick={ this.add }>
                <PersonAddIcon />
              </IconButton>
            </Typography>
            <div className="inputs" style={{marginBottom: '16px'}}>
              { names }
            </div>
            <Button variant="contained" color="primary" onClick={ this.setNames } disabled={ this.isValid() }>
              Split bill
            </Button>
        </CardContent>
      </Card>
    );
  }

  private setNames = () => {
    this.props.setNames(this.state.names);
  }

  private add = () => {
    this.setState({ names: [...this.state.names, ""] });
  }

  private arrayContainsDuplicates = (a: string[]) => {
    const uniqueSet:Set<string> = new Set();
    for(let i = 0; i <= a.length; i++) {
      if (a[i] == null) {
        continue
      }
      const value = a[i].toLowerCase();
      if (uniqueSet.has(value)) {
        return true;
      }
      uniqueSet.add(value)
    }
    return false;
  }

  private arrayContainsString = (a: string[], s: string) => {
    return a.indexOf(s) !== -1;
  }

  private isValid = () => {
    if (this.arrayContainsDuplicates(this.state.names)) {
      return true;
    }
    return this.arrayContainsString(this.state.names, "")
  }

  private changeName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNames: string[] = [...this.state.names];
    newNames[index] = event.target.value!;
    this.setState({ names: newNames });
  }
}
