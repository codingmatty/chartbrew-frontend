import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Spacer, CircularProgress
} from "@nextui-org/react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getProject as getProjectAction } from "../actions/project";
import Container from "../components/Container";
import Row from "../components/Row";
import Text from "../components/Text";

function ProjectRedirect(props) {
  const { match, getProject, history } = props;

  useEffect(() => {
    getProject(match.params.projectId, true)
      .then((project) => {
        history.push(`/${project.team_id}/${project.id}/dashboard`);
      })
      .catch(() => {
        history.push("/user");
      });
  }, []);

  return (
    <Container>
      <Spacer y={4} />
      <Row align="center" justify="center">
        <CircularProgress color="default" size="xl" aria-label="Loading" />
      </Row>
      <Spacer y={1} />
      <Row align="center" justify="center">
        <Text size="lg" color="gray">Loading the dashboard...</Text>
      </Row>
    </Container>
  );
}

ProjectRedirect.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  getProject: (id, active) => dispatch(getProjectAction(id, active)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectRedirect));