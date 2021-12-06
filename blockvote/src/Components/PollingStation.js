import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [candidate1Votes,changeVote1]=useState('--')
  const [candidate2Votes,changeVote2]=useState('--')




  useEffect(()=>{
    const getInfo=async()=>{
      let voteCount = await window.contract.getVotes({
        prompt:localStorage.getItem("prompt")
      })
      changeVote1(voteCount[0])
      changeVote2(voteCount[1])
      //image part 

      changeCandidate1Url(
        await window.contract.getUrl({name:localStorage.getItem("Candidate1")})
      )
      changeCandidate2Url(
        await window.contract.getUrl({name:localStorage.getItem("Candidate2")})
      )
      
      
      let didUserVote= await window.contract.didParticipate({
        prompt:localStorage.getItem("prompt"),
        user:window.accountId
      })
      changeResultsDisplay(didUserVote);

    }
    getInfo();
  },[])

  const addVote=async(index)=>{
    await window.contract.addVote({
      prompt:localStorage.getItem("prompt"),
      index:index,
    });
    await window.contract.recordUser({
      prompt:localStorage.getItem("prompt"),
      user:window.accountId,
    });
    changeResultsDisplay(true);
  }
  return (

    <Container>
      <Row>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgMFUtxL_puGEjFm5Mglng3gEtkSjQPHtVTw&usqp=CAU"
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button disabled={showresults} onClick={()=> addVote(0)}>Vote</Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#c4c4c4",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
            }}
          >
            Who would win in smash?
          </div>
        </Col>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src="data:image/jpeg;base64,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"
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button disabled={showresults} onClick={()=> addVote(1)}>Vote</Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PollingStation;
