import { Tab } from "bootstrap";
import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useState } from "react";
const Home = (props) => {
  const [promptList, setPromptList] = useState([]);
  // https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg
  //   https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg
  const loadData = async () => {
    try {
      const prompts = await window.contract.getAllPrompts();
      console.log(prompts);
      setPromptList(prompts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Table style={{ margin: "5vh" }} stripped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button onClick={() => props.changeCandidates(el)}>
                    Go to Poll
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
