/*
* Actions must follow the flux standard action (FSA) standard, found here:
* (https://github.com/acdlite/flux-standard-action). Some middleware also
* assume this standard. To enforce consistent actions and to avoid unnecessary
* boilerplate, this action creator must be used.
*/

const createAction = (type) => (payload, meta) => ({
  type,
  payload,
  error: payload instanceof Error,
  meta,
});

export default createAction;
