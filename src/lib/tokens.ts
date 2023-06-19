export const invetaionAndReferralTokens = () => {
  if (typeof document === 'undefined') {
    return { invitationToken: null, referralToken: null };
  }

  const cookies = document.cookie.split(";").map(x => {
    const [name, value] = x.trim().split("=");
    return { name, value };
  });
  const invitationToken = cookies?.filter(x => x.name == 'invitation-token')[0]?.value ?? null;
  const referralToken = cookies?.filter(x => x.name == 'referral-token')[0]?.value ?? null;
  return { invitationToken, referralToken }
}
