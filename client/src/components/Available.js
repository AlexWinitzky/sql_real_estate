import React from 'react';
import axios from 'axios';
import { List, Table, } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller'

class Available extends React.Component {
  state = { agents: [], page: 1, total_pages: 0, loaded: true, };


  componentDidMount() {
    axios.get('/api/properties')
      .then(res => {
        this.setLoaded()
        let agents = this.normalizeData(res.data.paginated);
        this.setState({ agents: [...this.state.agents, ...agents], total_pages: res.data.total_pages, });
      })
    this.setLoaded()
  }

  normalizeData = (data) => {
    let agents = [];
    let ids = [...new Set(data.map(d => d.agent_id))];
    ids.map(id => {
      let properties = data.filter(d => d.agent_id === id);
      let { agent_id, first_name, last_name, email, phone } = properties[0];
      let agentProperties = properties.map(p => {
        let { price, beds, baths, sq_ft, city, street, zip, id, } = p;
        return { price, beds, baths, sq_ft, city, street, zip, id, };
      });

      let detail = { agent_id, first_name, last_name, email, phone, properties: agentProperties, };

      agents.push(detail);
    });
    return agents;
  }

  setLoaded = () => this.setState({ loaded: !this.state.loaded })

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/properties?page=${page}`)
      .then(({ data }) => {
        this.setLoaded()
        let agents = this.normalizeData(data.paginated);
        this.setState({ agents: [...this.state.agents, ...agents], page, });
      })
    this.setLoaded()
  }


  render() {
    const { agents, page, total_pages, loaded } = this.state;
    if (loaded) {

      return (
        <List styles={styles.scroller}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={page < total_pages}
          >
            {agents.map(agent => {
              let { first_name, last_name, email, phone, properties, } = agent;
              return (
                <List.Item>
                  <List.Header>{first_name} {last_name} <br />  {email} <br /> {phone}</List.Header>
                  <List.Item>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Beds</Table.HeaderCell>
                          <Table.HeaderCell>Baths</Table.HeaderCell>
                          <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                          <Table.HeaderCell>Street</Table.HeaderCell>
                          <Table.HeaderCell>City</Table.HeaderCell>
                          <Table.HeaderCell>ZIP</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {properties.map(p =>
                          <Table.Row key={p.id}>
                            <Table.Cell>${p.price}</Table.Cell>
                            <Table.Cell>{p.beds}</Table.Cell>
                            <Table.Cell>{p.baths}</Table.Cell>
                            <Table.Cell>{p.sq_ft}</Table.Cell>
                            <Table.Cell>{p.street}</Table.Cell>
                            <Table.Cell>{p.city}</Table.Cell>
                            <Table.Cell>{p.zip}</Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </List.Item>
                </List.Item>
              )
            })
            }
          </InfiniteScroll>
        </List>
      )
    } else {
      return (
        <div style={styles.outer}>
          <div style={{ fontSize: '100px' }}>Loading...</div>
        </div>
      )
    }
  }
}

const styles = {
  scroller: {
    height: '80vh',
    overflow: 'auto',
  },
  outer: {
    height: '800px',
    margin: ' 0', display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Available
