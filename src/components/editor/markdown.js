import React from 'react';
import marked from 'marked';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';
import { throttle } from '@utils/index';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

class Markdown extends React.Component {
  state = {
    title: '',
    content: '',
  };

  componentDidMount() {
    hljs.registerLanguage('javascript', javascript);
    marked.setOptions({
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });
  }

  handleTitleChange = e => {
    console.log(e.target.value);
    this.setState({ title: e.target.value });
  };

  handleContentChange = throttle(str => {
    this.setState({ content: marked(str, { breaks: true }) });
  }, 100);

  render() {
    const { content } = this.state;
    const { t, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <InputBase
            className={classes.input}
            placeholder={t('Blog Title')}
            onChange={this.handleTitleChange}
          />
        </div>
        <Grid className={classes.main} container>
          <Grid className={classes.left} item xs={6}>
            <div
              className={classes.editor}
              contentEditable="plaintext-only"
              onInput={e => this.handleContentChange(e.target.innerText)}
            />
          </Grid>
          <Grid className={classes.right} item xs={6}>
            <div style={{overflow: 'visible'}} dangerouslySetInnerHTML={{ __html: content }} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5),
    height: theme.spacing(6),
    background: '#333333',
  },
  input: {
    color: '#ffffff',
  },
  main: {
    height: '100%',
    overflow: 'hidden',
  },
  left: {
    height: '100%',
    background: '#4b4a40',
  },
  right: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
  },
  editor: {
    padding: theme.spacing(1.5),
    height: '100%',
  },
});

export default translate()(withStyles(styles)(Markdown));
