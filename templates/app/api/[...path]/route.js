import { handleRequest } from '../../../cms/api.js';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export { handleRequest as GET, handleRequest as POST, handleRequest as PUT,
  handleRequest as DELETE, handleRequest as PATCH, handleRequest as OPTIONS };
