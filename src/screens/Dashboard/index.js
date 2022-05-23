import React from 'react';
import 'rsuite/styles/index.less';

import { Container, Content, Grid, Row, Col } from 'rsuite';
import PageHeader from '/src/components/PageHeader';
import { useSelector } from 'react-redux'
import ProtectedPage from 'src/components/ProtectedPage';
import _ from 'lodash';

function Dashboard({id}) {
  const userRole = useSelector(state => state.user.userRole)

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      
 
      
      {/* <PageHeader title="Dashboard"/> */}
      <Content>

        {
          userRole === "NOT_AUTHORIZED" &&
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '80vh'}}>
            <div style={{alignItems: 'center', flexDirection: 'column', display: "flex"}}>
              <p style={{fontSize: 20, fontWeight: 'bold'}}>You are not authorized.</p>
              <p>Ask your admin to get access.</p>
            </div>
          </div>
        }
        


        {/* <Grid fluid> */}
          {
            // _.chunk([1,1,1,1,1,1,1,1], 4).map((homeChunk, index)=> {
            //     return(
            //       <Row style={{paddingTop: 50}}>
            //         {
            //           homeChunk.map((game, index)=> {
            //             return(
            //               <Col lgOffset={1} md={12} lg={5}>
            //                 <div style={{backgroundColor: "rgb(33,34,40)", width: 200, height: 200, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24}}>
            //                   <h2 style={{color: "black"}}>TEST</h2>
            //                 </div>
            //               </Col>
            //             )
            //           })
            //         }
            //       </Row>
            //     )
            // })
          }
        {/* </Grid> */}


      </Content>


    </Container>
  );
}

export default Dashboard;