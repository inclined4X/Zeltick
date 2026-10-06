const ROLE_CAPABILITIES = {
  manager: [
    "manage_events",
    "sell_tickets",
    "process_refunds",
    "check_in",
    "assign_staff",
  ],
  ticket_seller: ["sell_tickets"],
  check_in_staff: ["check_in"],
};

const canRolePerform = (role, capability) => {
  const allowedCapabilities = ROLE_CAPABILITIES[role];

  if (!allowedCapabilities) {
    return false;
  }

  return allowedCapabilities.includes(capability);
};
