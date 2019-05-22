import React from 'react';
import marked from 'marked';
import Grid from '@material-ui/core/Grid';

import { debounce } from '@utils/index';

class Markdown extends React.Component {
  state = {
    content: '',
  }

  handleContentChange = debounce((e) => {
    console.log(e);
    // this.setState({ content: marked('# Hello Markdown') });
  }, 300);

  render() {
    const { content } = this.state;
    return (
      <Grid container>
        <Grid item xs={6}>
          <div contentEditable="plaintext-only" onInput={this.handleContentChange}></div>
        </Grid>
        <Grid item xs={6}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Grid>
      </Grid>
    );
  }
}

export default Markdown;
