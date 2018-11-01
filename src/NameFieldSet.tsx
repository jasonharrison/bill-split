import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import * as React from 'react';

interface INameFieldSetProps {
  setNames: (names: string[]) => void;
}

interface INameFieldSetState {
  names: string[]
}

export class NameFieldSet extends React.Component<INameFieldSetProps, INameFieldSetState> {
  public state = {
    names: ["", ""]
  }

  public render () {
    const names = this.state.names.map((value: string, index: number) => {
      let minusBtn = null;
      if (index > 1) {
        minusBtn = <IconButton aria-label="Remove person" onClick={ this.remove(index) }>
                     <RemoveCircleIcon style={{height: '24px', width: '24x'}} />
                   </IconButton>
      }
      return (<div key={ index }>
                <TextField type="text"
                           label="Name"
                           value={ value } 
                           onChange={ this.changeName(index) }
                           onKeyPress={ this.setNamesOnEnterButton }
                />
                { minusBtn }
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
            <Button id="splitBtn" variant="contained" color="primary" onClick={ this.setNames } disabled={ !this.isValid() }>
              Split bill
            </Button>
        </CardContent>
      </Card>
    );
  }

  private setNames = () => {
    const newNames = this.removeBlankNamesFromNameArray(this.state.names);
    this.setState({ names: newNames });
    this.props.setNames(this.state.names);
  }

  private add = () => {
    this.setState({ names: [...this.state.names, ""] });
  }

  private remove = (index: number) => (event: React.MouseEvent<HTMLElement>) => {
    const names = [...this.state.names];
    names.splice(index, 1);
    this.setState({names});
  }

  private nameArrayContainsDuplicates = () => {
    const uniqueNameSet:Set<string> = new Set();
    for(let i = 0; i <= this.state.names.length; i++) {
      if (this.state.names[i] == null) {
        continue
      }
      const lowerCaseName = this.state.names[i].toLowerCase();
      if (uniqueNameSet.has(lowerCaseName)) {
        return true;
      }
      uniqueNameSet.add(lowerCaseName)
    }
    return false;
  }

  private nameArrayContainsEmptyName = () => {
    const index = this.state.names.indexOf('');
    return (index !== -1 && index <= 1);
  }

  private removeBlankNamesFromNameArray = (newNames: string[]) => {
    for (let index = 0; index <= newNames.length; index++) {
      if (this.isEmptyOrSpaces(newNames[index])) {
        newNames.splice(index, 1);
      }
    }
    return newNames;
  }

  private setNamesOnEnterButton = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && this.isValid()) {
        this.setNames();
    }
  }

  private isEmptyOrSpaces = (s: string) => {
    if (s === undefined) {
      return true;
    }
    return s === null || s.match(/^ *$/) !== null;
  }

  private isValid = () => {
    if (this.nameArrayContainsDuplicates()) {
      return false;
    }
    return !this.nameArrayContainsEmptyName();
  }

  private changeName = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNames: string[] = [...this.state.names];
    newNames[index] = event.target.value!;
    this.setState({ names: newNames });
  }
}

export default NameFieldSet;