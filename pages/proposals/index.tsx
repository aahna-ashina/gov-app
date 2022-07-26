import type { NextPage } from 'next'
import Link from 'next/link'

import { fetchProposals } from '../../lib/proposals'

const Proposals: NextPage = ({ proposals }) => {
  return (
    <div className="hero">
      <div className="hero-content flex flex-col">
        <h1 className="text-3xl text-left w-full">Proposals</h1>
        <div className="flex flex-row flex-wrap gap-8">
          {proposals.map((proposal) => (
            <Link href={`/proposals/${proposal.id}`}>
              <div className="card w-96 bg-base-100 shadow-lg cursor-pointer transition hover:scale-105">
                <div className="card-body">
                  <div className="flex flex-row flex-wrap gap-2">
                    <div className="badge badge-primary">
                      {proposal.content.kind}
                    </div>
                    {proposal.approved === true ? (
                      <div className="badge badge-outline badge-success">
                        Approved
                      </div>
                    ) : (
                      proposal.approved === false && (
                        <div className="badge badge-outline badge-error">
                          Rejected
                        </div>
                      )
                    )}

                    {proposal.enacted === true ? (
                      <div className="badge badge-outline badge-success">
                        Enacted
                      </div>
                    ) : (
                      proposal.enacted === false && (
                        <div className="badge badge-outline badge-warning">
                          Pending enactment
                        </div>
                      )
                    )}
                  </div>
                  <h2 className="card-title">
                    #{proposal.id} {proposal.discussionMetadata.title}
                  </h2>

                  <p className="line-clamp-4">
                    {proposal.discussionMetadata.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const proposals = await fetchProposals(0, true)

  return {
    props: { proposals: proposals.reverse() },
  }
}

export default Proposals
