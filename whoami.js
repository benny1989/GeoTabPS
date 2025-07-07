/** Geotab Drive Add-In script **/
geotab.addin.whoami = function() {
  let userInfo = null;  // will hold comprehensive user info

  return {
    // Startup lifecycle method – runs on Drive app login
    startup: function(api, state, initializeCallback) {
      // Get the current session to retrieve comprehensive session data
      api.getSession((sessionResult) => {
        console.log('Full Session Data:', sessionResult);
        
        const sessionInfo = {
          database: sessionResult.database,
          userName: sessionResult.credentials.userName,
          userId: sessionResult.credentials.userId,
          sessionId: sessionResult.sessionId,
          server: sessionResult.server,
          path: sessionResult.path,
          version: sessionResult.version,
          serverTime: sessionResult.serverTime,
          timeZoneId: sessionResult.timeZoneId,
          locale: sessionResult.locale,
          deviceId: sessionResult.deviceId,
          deviceName: sessionResult.deviceName,
          deviceSerialNumber: sessionResult.deviceSerialNumber,
          deviceType: sessionResult.deviceType,
          deviceVersion: sessionResult.deviceVersion,
          deviceVersionId: sessionResult.deviceVersionId,
          deviceVersionName: sessionResult.deviceVersionName,
          deviceVersionDescription: sessionResult.deviceVersionDescription,
          deviceVersionComment: sessionResult.deviceVersionComment,
          deviceVersionDate: sessionResult.deviceVersionDate,
          deviceVersionIsReadOnly: sessionResult.deviceVersionIsReadOnly,
          deviceVersionIsSystem: sessionResult.deviceVersionIsSystem,
          deviceVersionIsDeleted: sessionResult.deviceVersionIsDeleted,
          deviceVersionIsArchived: sessionResult.deviceVersionIsArchived,
          deviceVersionIsActive: sessionResult.deviceVersionIsActive,
          deviceVersionIsInactive: sessionResult.deviceVersionIsInactive,
          deviceVersionIsPending: sessionResult.deviceVersionIsPending,
          deviceVersionIsApproved: sessionResult.deviceVersionIsApproved,
          deviceVersionIsRejected: sessionResult.deviceVersionIsRejected,
          deviceVersionIsCancelled: sessionResult.deviceVersionIsCancelled,
          deviceVersionIsCompleted: sessionResult.deviceVersionIsCompleted,
          deviceVersionIsInProgress: sessionResult.deviceVersionIsInProgress,
          deviceVersionIsOnHold: sessionResult.deviceVersionIsOnHold,
          deviceVersionIsOverdue: sessionResult.deviceVersionIsOverdue,
          deviceVersionIsDue: sessionResult.deviceVersionIsDue,
          deviceVersionIsNotDue: sessionResult.deviceVersionIsNotDue,
          deviceVersionIsOverdue: sessionResult.deviceVersionIsOverdue,
          deviceVersionIsDue: sessionResult.deviceVersionIsDue,
          deviceVersionIsNotDue: sessionResult.deviceVersionIsNotDue
        };

        // Fetch the User object for this username (to get full user details)
        api.call(
          "Get", 
          { typeName: "User", search: { name: sessionResult.credentials.userName } }, 
          function(userResults) {
            if (userResults && userResults.length > 0) {
              const user = userResults[0];
              console.log('Full User Data:', user);
              
              const userDetails = {
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                employeeNo: user.employeeNo,
                isDriver: user.isDriver,
                isDriverEditable: user.isDriverEditable,
                isDriverEditableSpecified: user.isDriverEditableSpecified,
                isDriverSpecified: user.isDriverSpecified,
                isSystem: user.isSystem,
                isSystemSpecified: user.isSystemSpecified,
                isDeleted: user.isDeleted,
                isDeletedSpecified: user.isDeletedSpecified,
                isArchived: user.isArchived,
                isArchivedSpecified: user.isArchivedSpecified,
                isActive: user.isActive,
                isActiveSpecified: user.isActiveSpecified,
                isInactive: user.isInactive,
                isInactiveSpecified: user.isInactiveSpecified,
                isPending: user.isPending,
                isPendingSpecified: user.isPendingSpecified,
                isApproved: user.isApproved,
                isApprovedSpecified: user.isApprovedSpecified,
                isRejected: user.isRejected,
                isRejectedSpecified: user.isRejectedSpecified,
                isCancelled: user.isCancelled,
                isCancelledSpecified: user.isCancelledSpecified,
                isCompleted: user.isCompleted,
                isCompletedSpecified: user.isCompletedSpecified,
                isInProgress: user.isInProgress,
                isInProgressSpecified: user.isInProgressSpecified,
                isOnHold: user.isOnHold,
                isOnHoldSpecified: user.isOnHoldSpecified,
                isOverdue: user.isOverdue,
                isOverdueSpecified: user.isOverdueSpecified,
                isDue: user.isDue,
                isDueSpecified: user.isDueSpecified,
                isNotDue: user.isNotDue,
                isNotDueSpecified: user.isNotDueSpecified,
                comment: user.comment,
                dateFormat: user.dateFormat,
                timeFormat: user.timeFormat,
                timeZoneId: user.timeZoneId,
                locale: user.locale,
                language: user.language,
                country: user.country,
                state: user.state,
                city: user.city,
                address: user.address,
                postalCode: user.postalCode,
                companyGroups: user.companyGroups ? user.companyGroups.map(g => ({
                  id: g.id,
                  name: g.name,
                  comment: g.comment
                })) : [],
                securityGroups: user.securityGroups ? user.securityGroups.map(sg => ({
                  id: sg.id,
                  name: sg.name,
                  comment: sg.comment
                })) : [],
                customProperties: user.customProperties || {},
                lastAccess: user.lastAccess,
                lastAccessSpecified: user.lastAccessSpecified,
                lastLogin: user.lastLogin,
                lastLoginSpecified: user.lastLoginSpecified,
                lastLogout: user.lastLogout,
                lastLogoutSpecified: user.lastLogoutSpecified,
                lastPasswordChange: user.lastPasswordChange,
                lastPasswordChangeSpecified: user.lastPasswordChangeSpecified,
                passwordExpiry: user.passwordExpiry,
                passwordExpirySpecified: user.passwordExpirySpecified,
                passwordNeverExpires: user.passwordNeverExpires,
                passwordNeverExpiresSpecified: user.passwordNeverExpiresSpecified,
                passwordChangeRequired: user.passwordChangeRequired,
                passwordChangeRequiredSpecified: user.passwordChangeRequiredSpecified,
                passwordChangeOnNextLogin: user.passwordChangeOnNextLogin,
                passwordChangeOnNextLoginSpecified: user.passwordChangeOnNextLoginSpecified,
                passwordHistory: user.passwordHistory || [],
                failedLoginAttempts: user.failedLoginAttempts,
                failedLoginAttemptsSpecified: user.failedLoginAttemptsSpecified,
                lockedOut: user.lockedOut,
                lockedOutSpecified: user.lockedOutSpecified,
                lockedOutUntil: user.lockedOutUntil,
                lockedOutUntilSpecified: user.lockedOutUntilSpecified,
                accountExpiry: user.accountExpiry,
                accountExpirySpecified: user.accountExpirySpecified,
                accountNeverExpires: user.accountNeverExpires,
                accountNeverExpiresSpecified: user.accountNeverExpiresSpecified,
                accountDisabled: user.accountDisabled,
                accountDisabledSpecified: user.accountDisabledSpecified,
                accountLocked: user.accountLocked,
                accountLockedSpecified: user.accountLockedSpecified,
                accountUnlocked: user.accountUnlocked,
                accountUnlockedSpecified: user.accountUnlockedSpecified,
                accountEnabled: user.accountEnabled,
                accountEnabledSpecified: user.accountEnabledSpecified,
                accountActive: user.accountActive,
                accountActiveSpecified: user.accountActiveSpecified,
                accountInactive: user.accountInactive,
                accountInactiveSpecified: user.accountInactiveSpecified,
                accountPending: user.accountPending,
                accountPendingSpecified: user.accountPendingSpecified,
                accountApproved: user.accountApproved,
                accountApprovedSpecified: user.accountApprovedSpecified,
                accountRejected: user.accountRejected,
                accountRejectedSpecified: user.accountRejectedSpecified,
                accountCancelled: user.accountCancelled,
                accountCancelledSpecified: user.accountCancelledSpecified,
                accountCompleted: user.accountCompleted,
                accountCompletedSpecified: user.accountCompletedSpecified,
                accountInProgress: user.accountInProgress,
                accountInProgressSpecified: user.accountInProgressSpecified,
                accountOnHold: user.accountOnHold,
                accountOnHoldSpecified: user.accountOnHoldSpecified,
                accountOverdue: user.accountOverdue,
                accountOverdueSpecified: user.accountOverdueSpecified,
                accountDue: user.accountDue,
                accountDueSpecified: user.accountDueSpecified,
                accountNotDue: user.accountNotDue,
                accountNotDueSpecified: user.accountNotDueSpecified
              };

              // Compose comprehensive info message
              const displayName = user.firstName && user.lastName ? 
                `${user.firstName} ${user.lastName}` : user.name;
              
              const groupNames = user.companyGroups && user.companyGroups.length > 0 ? 
                user.companyGroups.map(g => g.name || g.id).join(", ") : "None";
              
              const securityGroupNames = user.securityGroups && user.securityGroups.length > 0 ? 
                user.securityGroups.map(sg => sg.name || sg.id).join(", ") : "None";

              userInfo = {
                session: sessionInfo,
                user: userDetails,
                summary: {
                  displayName: displayName,
                  email: user.email,
                  groups: groupNames,
                  securityGroups: securityGroupNames,
                  isActive: user.isActive,
                  isDriver: user.isDriver,
                  lastLogin: user.lastLogin,
                  lastAccess: user.lastAccess
                }
              };

              // Show comprehensive info
              const infoMessage = `=== SESSION INFO ===
Database: ${sessionInfo.database}
Server: ${sessionInfo.server}
Session ID: ${sessionInfo.sessionId}
User ID: ${sessionInfo.userId}

=== USER INFO ===
Name: ${displayName}
Email: ${user.email}
Phone: ${user.phone || 'N/A'}
Employee #: ${user.employeeNo || 'N/A'}

=== GROUPS ===
Company Groups: ${groupNames}
Security Groups: ${securityGroupNames}

=== STATUS ===
Active: ${user.isActive ? 'Yes' : 'No'}
Driver: ${user.isDriver ? 'Yes' : 'No'}
Last Login: ${user.lastLogin || 'N/A'}
Last Access: ${user.lastAccess || 'N/A'}

=== LOCATION ===
Country: ${user.country || 'N/A'}
State: ${user.state || 'N/A'}
City: ${user.city || 'N/A'}

Check console for full data objects.`;

              alert(infoMessage);
              console.log('Comprehensive User Info:', userInfo);

            } else {
              // No user found (unexpected), alert with session info only
              userInfo = { session: sessionInfo, user: null };
              const fallbackMessage = `Session Info Available:
Database: ${sessionInfo.database}
Server: ${sessionInfo.server}
User Name: ${sessionInfo.userName}
User ID: ${sessionInfo.userId}

No detailed user information found for: ${sessionInfo.userName}`;
              
              alert(fallbackMessage);
              console.log('Session Info Only:', userInfo);
            }
            initializeCallback();  // signal that startup is done
          },
          function(errorMsg, error) {
            console.error("WhoAmI Add-In: Failed to load user info", errorMsg || error);
            // Even if the API call fails, continue startup to not block app
            userInfo = { session: sessionInfo, user: null, error: errorMsg || error };
            initializeCallback();
          }
        );
      });
    },

    // Focus lifecycle – runs each time user opens the add-in page
    focus: function(api, state) {
      if (userInfo) {
        // Show summary info when focusing
        const summary = userInfo.summary || userInfo.session;
        if (summary) {
          const focusMessage = summary.displayName ? 
            `Welcome back, ${summary.displayName}!` :
            `Welcome back, ${summary.userName || 'User'}!`;
          alert(focusMessage);
        }
      }
    },

    // Blur lifecycle – runs when leaving the add-in page
    blur: function(api, state) {
      // No cleanup needed for this simple add-in
    }
  };
};
