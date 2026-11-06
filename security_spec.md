# Security Specification - BiositesAI Multiempresa

## 1. Data Invariants
- Each company document `/companies/{companyId}` has an `ownerId` representing the user who created and manages it.
- A company's subcollections (products, services, links, lia_config) belong exclusively to `/companies/{companyId}`.
- Visitors can view public company details, products, services, and links to interact with the biosite.
- Only the authenticated owner of a company (`ownerId == request.auth.uid`) can create, edit, or delete its products, services, links, and LIA configs.
- No company owner can mutate or access private configuration of another company.
- User profiles in `/users/{userId}` can only be read and written by that specific authenticated user.

## 2. Dirty Dozen Threat Payloads
1. Cross-Company Write: User A attempts to write a product to Company B's subcollection. (DENIED)
2. Unauthenticated Product Delete: Visitor attempts to delete a product. (DENIED)
3. Shadow Field Injection: Attacker attempts to update user profile with admin roles or arbitrary keys. (DENIED)
4. Massive String Resource Exhaustion: Injecting a 1MB title into a link or product. (DENIED)
5. Owner Spoofing: User attempts to change `ownerId` of an existing company. (DENIED)
6. Malicious ID Path Traversal: Path variable with invalid characters. (DENIED)
7. Unauthorized Conversation Tampering: Mutating conversations belonging to another company. (DENIED)
8. User Profile Impersonation: Reading or writing another user's profile in `/users/{otherUid}`. (DENIED)
9. Unauthenticated Company Settings Override: Modifying LIA configuration without auth. (DENIED)
10. Orphaned Subcollection Write: Creating sub-items without an existing parent company. (DENIED)
11. Fake Timestamps: Client passing invalid non-server timestamps. (DENIED)
12. Blanket List Leak: Querying all users or unowned administrative records. (DENIED)
