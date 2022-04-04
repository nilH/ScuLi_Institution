import React from 'react';
import { Redirect, Route } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import AuthGuardedRoute from '../common/AuthGuardedRoute';
import InstitutionSettingsPage from '../../features/institution-settings/InstitutionSettingsPage';
import UserProfilePage from '../../features/user-profile/UserProfilePage';
import DashboardHome from '../common/dashboard/DashboardHome';
import DashboardPage from '../common/dashboard/DashboardPage';
import './styles.css';
import ManageCoursePage from '../../features/manage-courses/ManageCoursePage';
import FeedbackPage from '../../features/feedback/FeedbackPage';
import ReportedUsersPage from '../../features/reported-users/ReportedUsersPage';
import LoginPage from '../../features/auth/LoginPage';
import TutorApplicationsPage from '../../features/tutor-applications/TutorApplicationsPage';

function App() {
  return (
    <>
      <AuthGuardedRoute path='/app'>
        <DashboardPage>
          <Route exact path='/app/dashboard' component={DashboardHome} />

          <Route exact path='/app/profile' component={UserProfilePage} />

          <Route exact path='/app/courses' component={ManageCoursePage} />

          <Route
            exact
            path='/app/tutor-apps'
            component={TutorApplicationsPage}
          />

          <Route exact path='/app/feedbacks' component={FeedbackPage} />
          <Route
            exact
            path='/app/reported-users'
            component={ReportedUsersPage}
          />

          <Route
            exact
            path='/app/settings'
            component={InstitutionSettingsPage}
          />
        </DashboardPage>
        <Redirect from='/app' to='/app/dashboard' />
      </AuthGuardedRoute>
      <Route path='/login' component={LoginPage} />
    </>
  );
}
export default App;
